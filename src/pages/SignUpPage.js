import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import { accentColor } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import UserContext from "../contexts/UserContext";

export default function SignUpPage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signup(e) {
    e.preventDefault();
    axios
      .post(`${BASE_URL}auth/sign-up`, userInfo)
      .then(() => navigate("/")) //FIXME Ajustar erro da foto
      .catch((err) => {
        alert(err.response.data);
        setLoading(!loading)
        setUserInfo({});
        //TODO Habilitar botão e inputs
      });
    setLoading(!loading);
    //TODO Desabilitar botão e inputs
  }

  function SignUpButton() {
    if (loading) {
      return (
        <button type="submit">
          <Loader />
        </button>
      );
    } else {
      return <button type="submit">Sign up</button>;
    }
  }

  function handleForm(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  return (
    <HomePageStyled>
      <Logo />
      <form onSubmit={signup}>
        <input
          id="email"
          name="email"
          value={userInfo.email || ""}
          onChange={handleForm}
          placeholder="email"
          required // FIXME: deixar required
        />
        <input
          id="password"
          type="password"
          name="password"
          value={userInfo.password || ""}
          onChange={handleForm}
          placeholder="password"
          required // FIXME: deixar required
        />
        <input
          id="name"
          name="name"
          value={userInfo.name || ""}
          onChange={handleForm}
          placeholder="name"
          required // FIXME: deixar required
        />
        <input
          id="image"
          name="image"
          value={userInfo.image || ""}
          onChange={handleForm}
          placeholder="image"
          // required // FIXME: deixar required
        />
        <SignUpButton />
      </form>
      <Link to="/">Already have an account? Log in!</Link>
    </HomePageStyled>
  );
}

const HomePageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 40px;
  a {
    color: ${accentColor};
    font-size: 14px;
    &:visited {
      filter: brightness(0.6);
    }
  }
`;
