import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../components/Logo/Logo";
import { accentColor } from "../../constants/colors";

export default function SignUpPage() {
  const [userInfo, setUserInfo] = useState({});

  function signup(e) {
    e.preventDefault();
    console.log("Clicou!");
  }

  function handleForm(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  return (
    <HomePageStyled>
      <Logo />
      <SignUpFormStyled onSubmit={signup}>
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
        <input
          id="name"
          name="name"
          value={userInfo.name || ""}
          onChange={handleForm}
          placeholder="name"
          required
        />
        <input
          id="photo"
          name="photo"
          value={userInfo.photo || ""}
          onChange={handleForm}
          placeholder="photo"
          required
        />
        <button type="submit">Sign up</button>
      </SignUpFormStyled>
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
const SignUpFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 303px;
`;
