import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import { accentColor } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import UserContext from "../contexts/UserContext";

export default function HomePage() {
  const { setUserInfo } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   var hours = 12; // to clear the localStorage after "hours" hours
  //   var now = new Date().getTime();
  //   var setupTime = localStorage.getItem("setupTime");
  //   if (setupTime === null) {
  //     localStorage.setItem("setupTime", now);
  //   } else {
  //     if (now - setupTime > hours * 60 * 60 * 1000) {
  //       localStorage.clear();
  //       localStorage.setItem("setupTime", now);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   const userInfoStringfied = localStorage.getItem("user");
  //   if (userInfoStringfied) {
  //     const userInfoParsed = JSON.parse(userInfoStringfied);
  //     setUserInfo(userInfoParsed);
  //     setLoginInfo({
  //       email: userInfoParsed.email,
  //       password: userInfoParsed.password,
  //     });
  //     login();
  //   }
  // }, [login, setLoginInfo, setUserInfo]);

  function login(e) {
    e.preventDefault();
    const body = { email: loginInfo.email, password: loginInfo.password };
    axios
      .post(`${BASE_URL}auth/login`, body)
      .then((r) => {
        setUserInfo({ ...r.data });
        // localStorage.setItem("user", JSON.stringify({ ...r.data }));
        navigate("/today");
      })
      .catch((e) => {
        console.log(e.response.data);
        setLoading(!loading);
      });
    setLoading(!loading);
  }

  function LogInButton() {
    if (loading) {
      return (
        <button type="submit" disabled={loading} data-identifier="login-btn">
          <Loader />
        </button>
      );
    } else {
      return <button type="submit" data-identifier="login-btn">Log in</button>;
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
          disabled={loading}
          required
          data-identifier="input-email"
        />
        <input
          id="password"
          type="password"
          name="password"
          value={loginInfo.password || ""}
          onChange={handleForm}
          placeholder="password"
          disabled={loading}
          required
          data-identifier="input-password"
        />
        <LogInButton />
      </form>
      <Link to="/signup" data-identifier="sign-up-action">Don't have an account? Sign up!</Link>
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
