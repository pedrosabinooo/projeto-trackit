import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import Logo from "../components/Logo";
import { accentColor } from "../constants/colors";
import { BASE_URL } from "../constants/urls";

export default function SignUpPage() {
  const [userInfo, setUserInfo] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signUp(e) {
    e.preventDefault();
    axios
      .post(`${BASE_URL}auth/sign-up`, userInfo)
      .then(() => navigate("/"))
      .catch((err) => {
        alert(err.response.data.message);
        resetForm();
      });
    setLoading(true);
  }

  function resetForm() {
    setUserInfo({});
    setLoading(false);
  }

  function handleForm(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  return (
    <SignUpPageStyled>
      <Logo />
      <form onSubmit={signUp}>
        <input
          id="email"
          name="email"
          value={userInfo?.email || ""}
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
          value={userInfo?.password || ""}
          onChange={handleForm}
          placeholder="password"
          disabled={loading}
          required
          data-identifier="input-password"
        />
        <input
          id="name"
          name="name"
          value={userInfo?.name || ""}
          onChange={handleForm}
          placeholder="name"
          disabled={loading}
          required
          data-identifier="input-name"
        />
        <input
          id="image"
          name="image"
          value={userInfo?.image || ""}
          onChange={handleForm}
          placeholder="image"
          disabled={loading}
          required
          data-identifier="input-photo"
        />
        <button type="submit" disabled={loading}>
          {loading ? <ThreeDots color="white" /> : "Sign up"}
        </button>
      </form>
      <Link to="/" data-identifier="back-to-login-action">
        Already have an account? Log in!
      </Link>
    </SignUpPageStyled>
  );
}

const SignUpPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
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
