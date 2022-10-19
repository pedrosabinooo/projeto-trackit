import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../components/Logo/Logo";
import { accentColor } from "../../constants/colors";

export default function HomePage() {
  const [userInfo, setUserInfo] = useState({});

  function login(e) {
    e.preventDefault();
    console.log("Clicou!");
  }

  function handleForm(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  return (
    <HomePageStyled>
      <Logo />
      <LogInFormStyled onSubmit={login}>
        <input
          id="email"
          name="email"
          value={userInfo.email || ""}
          onChange={handleForm}
          placeholder="email"
          required
        />
        <input
          id="password"
          type="password"
          name="password"
          value={userInfo.password || ""}
          onChange={handleForm}
          placeholder="password"
          required
        />
        <button type="submit">Log in</button>
      </LogInFormStyled>
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
const LogInFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 303px;
`;