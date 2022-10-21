import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import { accentColor } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import UserContext from "../contexts/UserContext";

export default function HomePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    const body = { email: loginInfo.email, password: loginInfo.password };
    axios
      .post(`${BASE_URL}auth/login`, body)
      .then((r) => {
        setUserInfo({ ...userInfo, id: r.data.id, token: r.data.token });
        navigate("/today");
      })
      .catch((e) => {
        console.log(e.response.data)
        setLoading(!loading);
        //TODO Habilitar botão e inputs
      });
    setLoading(!loading);
    //TODO Desabilitar botão e inputs
  }

  function LogInButton() {
    if (loading) {
      return (
        <button type="submit">
          <Loader />
        </button>
      );
    } else {
      return <button type="submit">Log in</button>;
    }
  }

  function handleForm(e) {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }

  return (
    <HomePageStyled>
      <Logo />
      <form onSubmit={login}>
        <input
          id="email"
          name="email"
          value={loginInfo.email || ""}
          onChange={handleForm}
          placeholder="email"
          required
        />
        <input
          id="password"
          type="password"
          name="password"
          value={loginInfo.password || ""}
          onChange={handleForm}
          placeholder="password"
          required
        />
        <LogInButton />
      </form>
      <Link to="/signup">Don't have an account? Sign up!</Link>
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
