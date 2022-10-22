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
    setLoading(!loading);
    axios
      .post(`${BASE_URL}auth/sign-up`, userInfo)
      .then((res) => {
        console.log(res.data);
        setLoading(!loading);
        navigate("/"); //FIXME Ajustar erro da foto
      })
      .catch((err) => {
        setLoading(!loading); //FIXME Botão e input não estão voltando a ficar habilitados
        setUserInfo({});
        alert(err.response.data);
      });
  }
  
  function SignUpButton() {
    if (loading) {
      return (
        <button type="submit" disabled={loading}>
          <Loader />
        </button>
      );
    } else {
      return (
        <button type="submit" onClick={() => setLoading(!loading)}>
          Sign up
        </button>
      );
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
          disabled={loading}
          required
          data-identifier="input-email"
        />
        <input
          id="password"
          type="password"
          name="password"
          value={userInfo.password || ""}
          onChange={handleForm}
          placeholder="password"
          disabled={loading}
          required
          data-identifier="input-password"
        />
        <input
          id="name"
          name="name"
          value={userInfo.name || ""}
          onChange={handleForm}
          placeholder="name"
          disabled={loading}
          required
          data-identifier="input-name"
        />
        <input
          id="image"
          name="image"
          value={userInfo.image || ""}
          onChange={handleForm}
          placeholder="image"
          disabled={loading}
          data-identifier="input-photo"
        />
        <SignUpButton />
      </form>
      <Link to="/" data-identifier="back-to-login-action">Already have an account? Log in!</Link>
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
