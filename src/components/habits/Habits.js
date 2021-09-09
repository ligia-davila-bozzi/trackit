import Header from "../header/Header";
import Footer from "../footer/Footer";
import {
    MyHabits,
    TitleContainer,
    PlusButton,
    NoHabitsYet,
} from "./habitsStyle";
import Habit from "./Habit";
import api from "../../api/api";
import { useState, useContext, useEffect } from "react";
import CreateHabit from "./CreateHabit";
import LoginContext from "../../contexts/LoginContext";
import axios from "axios";

export default function Habits() {
    const login = useContext(LoginContext);
    const [habits, setHabits] = useState([]);
    const [createHabit, setCreateHabit] = useState(false);
    const [newHabitName, setNewHabitName] = useState("");
    const [days, setDays] = useState([]);
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${login.token}`,
            },
        };

        axios
            .get(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
                config
            )
            .then((res) => setHabits(res.data));
    }, []);

    return (
        <>
            <Header />
            <main>
                <TitleContainer>
                    <MyHabits>Meus hábitos</MyHabits>
                    <PlusButton onClick={() => setCreateHabit(!createHabit)}>
                        +
                    </PlusButton>
                </TitleContainer>
                {createHabit ? (
                    <CreateHabit
                        weekdays={weekdays}
                        setCreateHabit={setCreateHabit}
                        habits={habits}
                        setHabits={setHabits}
                        newHabitName={newHabitName}
                        setNewHabitName={setNewHabitName}
                        days={days}
                        setDays={setDays}
                    />
                ) : (
                    ""
                )}
                {habits.length ? (
                    habits.map((habit) => (
                        <Habit
                            days={habit.days}
                            key={habit.id}
                            name={habit.name}
                            id={habit.id}
                            weekdays={weekdays}
                            setHabits={setHabits}
                        />
                    ))
                ) : (
                    <NoHabitsYet>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um
                        hábito para começar a trackear!
                    </NoHabitsYet>
                )}
            </main>
            <Footer />
        </>
    );
}
