import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { baseColor, doneHabit, undoneHabit } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs";
import HabitsCompletionContext from "../contexts/HabitsCompletionContext";

export default function TodayPage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { percentage, setPercentage } = useContext(HabitsCompletionContext);
  const [todayHabits, setTodayHabits] = useState([]);

  useEffect(() => {
    const userInfoStringfied = localStorage.getItem("user");
    if (userInfoStringfied) {
      const userInfoParsed = JSON.parse(userInfoStringfied);
      setUserInfo(userInfoParsed);
    }
  }, [setUserInfo]);

  const config = {
    headers: {
      Authorization: "Bearer " + userInfo.token,
    },
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}habits/today`, config)
      .then((res) => {
        setTodayHabits([...res.data]);
        getPercentageDone();
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  function getPercentageDone() {
    const countDoneHabits = todayHabits.filter(
      (todayHabit) => todayHabit.done
    ).length;
    const countTotalHabits = todayHabits.length;

    setPercentage(((countDoneHabits / countTotalHabits) * 100).toFixed(2));
  }

  function changeHabitStatus(habitId, isChecked) {
    axios
      .post(
        `${BASE_URL}habits/${habitId}/${isChecked ? "uncheck" : "check"}`,
        "",
        config
      )
      .then()
      .catch((err) => console.log(err.response.data));
  }

  function Habits() {
    if (!todayHabits) {
      return <span>LOADING...</span>;
    } else if (todayHabits.length === 0) {
      console.log(todayHabits);
      return <span>There's no habits to be tracked for today.</span>;
    } else {
      return (
        <>
          {todayHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              done={habit.done}
              data-identifier="today-infos"
            >
              <div>
                <p className="habit-name">{habit.name}</p>
                <p className="streak">{`Current streak: ${habit.currentSequence} days`}</p>
                <p className="streak">{`Max. streak: ${habit.highestSequence} days`}</p>
              </div>
              <button
                onClick={() => changeHabitStatus(habit.id, habit.done)}
                data-identifier="done-habit-btn"
              >
                <ion-icon name="checkbox"></ion-icon>
              </button>
            </HabitCard>
          ))}
        </>
      );
    }
  }

  return (
    <main className="today-page">
      <NavBar />
      <TitleBarStyled>
        <span data-identifier="today-infos">
          {dayjs().format("dddd, MM/DD")}
        </span>
        <p data-identifier="today-infos">
          {percentage || percentage === 0
            ? "No habits completed yet"
            : `${percentage * 100}% of habits complete`}
        </p>
      </TitleBarStyled>
      <Habits />
      <Footer />
    </main>
  );
}

const TitleBarStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  gap: 5px;
  span {
    font-size: 23px;
    color: ${baseColor};
  }
`;
const HabitCard = styled.div`
  display: flex;
  background: white;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 18px;
  .habit-name {
    margin-bottom: 5px;
    overflow: hidden;
  }
  .streak {
    display: flex;
    font-size: 13px;
    gap: 5px;
    line-height: 16px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    width: 69px;
    height: 69px;
    border: none;
    border-radius: 5px;
    background: none;
  }
  ion-icon {
    font-size: 69px;
    color: ${(props) => (props.done ? doneHabit : undoneHabit)};
  }
`;
