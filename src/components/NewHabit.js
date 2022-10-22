import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { accentColor, chosenDay } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import Weekdays from "./Weekdays";

export default function NewHabit({
  newHabitOpened,
  setNewHabitOpened,
  habits,
  setHabits,
  loading,
  setLoading,
}) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [selectedDays, setSelectedDays] = useState([]);
  const [newHabit, setNewHabit] = useState({});

  useEffect(() => {
    const userInfoStringfied = localStorage.getItem("user");
    console.log(userInfoStringfied);
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

  function createHabit() {
    setLoading(!loading);
    const body = { ...newHabit, days: selectedDays };
    axios
      .post(`${BASE_URL}habits`, body, config)
      .then((r) => {
        setHabits([...habits, r.data]);
        setNewHabitOpened(!newHabitOpened);
        setLoading(!loading);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(!loading);
      });
  }

  function handleForm(e) {
    setNewHabit({ ...newHabit, [e.target.name]: e.target.value });
  }

  return (
    <>
      <NewHabitCard newHabitOpened={newHabitOpened}>
        <input
          type="text"
          name="name"
          value={newHabit.name || ""}
          onChange={handleForm}
          placeholder="new habit name"
          disabled={loading}
          data-identifier="input-habit-name"
        />
        <Weekdays
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          loading={loading}
        />
        <ConfirmationButtons>
          <button
            className="cancel"
            disabled={loading}
            data-identifier="cancel-habit-create-btn"
            onClick={() => {
              setNewHabitOpened(!newHabitOpened);
            }}
          >
            cancel
          </button>
          <button onClick={() => createHabit()} disabled={loading} data-identifier="save-habit-create-btn">
            save
          </button>
        </ConfirmationButtons>
      </NewHabitCard>
    </>
  );
}

const NewHabitCard = styled.form`
  display: ${(props) => (props.newHabitOpened ? "flex" : "none")};
  background: white;
  border-radius: 5px;
  width: 100%;
  margin-top: -10px;
  margin-bottom: 20px;
  padding: 18px;
  font-size: 18px;
  overflow: hidden;
  .weekday {
    width: 35px;
    height: 30px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid ${chosenDay};
  }
`;
const ConfirmationButtons = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
  button {
    height: 35px;
    width: 85px;
    line-height: unset;
  }
  .cancel {
    background: none;
    color: ${accentColor};
  }
`;
