import { useState } from "react";
import styled from "styled-components";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import { accentColor, baseColor, inputTextColor } from "../../constants/colors";

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
  function Habits() {
    if (!habits) {
      return (
        <>
          <span>There's no habit to be tracked yet.</span>
          <span>Click on "+" to begin your journey!</span>
        </>
      );
    } else {
      return (
        <HabitCard>
          <p className="habit-name">Habit name</p>
          <Weekdays>
            {weekdays.map((d) => (
              <button className="weekday">{d}</button>
            ))}
          </Weekdays>
          <button className="delete"><ion-icon name="trash-outline" color="white"></ion-icon></button>
        </HabitCard>
      );
    }
  }
  return (
    <main className="habits-page">
      <NavBar />
      <TitleBarStyled>
        <span>My habits</span>
        <button>+</button>
      </TitleBarStyled>
      <NewHabitCard>
        <input type="text" name="input" placeholder="habit name" />
        <Weekdays>
          {weekdays.map((d) => (
            <button className="weekday">{d}</button>
          ))}
        </Weekdays>
        <ConfirmationButtons>
          <button className="cancel">Cancel</button>
          <button>Save</button>
        </ConfirmationButtons>
      </NewHabitCard>
      <Habits />
      <Footer />
    </main>
  );
}

const TitleBarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  span {
    font-size: 23px;
    color: ${baseColor};
  }
  button {
    width: 40px;
    height: 35px;
  }
`;
const NewHabitCard = styled.div`
  background: white;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 18px;
  font-size: 18px;
  .weekday {
    background: white;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    color: ${inputTextColor};
    width: 30px;
    height: 30px;
  }
`;
const Weekdays = styled.div`
  display: flex;
  gap: 4px;
`;
const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
  button {
    height: 35px;
    width: 85px;
  }
  .cancel {
    background: none;
    color: ${accentColor};
  }
`;
const HabitCard = styled.div`
  position: relative;
  background: white;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 18px;
  font-size: 18px;
  .habit-name {
    margin-bottom: 10px;
  }
  .weekday {
    background: white;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-size: 15px;
    color: ${inputTextColor};
    width: 25px;
    height: 25px;
  }
  .delete {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
    border-radius: 0 5px;
  }
`;
