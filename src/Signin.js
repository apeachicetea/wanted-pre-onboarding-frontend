import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  margin-top: 5px;
`;

const EmailInput = styled.input`
  width: 100%;
  height: 20px;
  margin-bottom: 5px;
`;

const PasswordInput = styled(EmailInput)``;

const SigninBtn = styled.button`
  width: 80px;
  height: 25px;
  cursor: pointer;
`;

const SignupBtn = styled.button`
  width: 80px;
  height: 25px;
  margin-left: 10px;
  cursor: pointer;
`;

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const baseURL = "https://www.pre-onboarding-selection-task.shop";
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/signin`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      const {
        status,
        data: { access_token },
      } = response;

      if (status === 200) {
        navigate("/todo");
        localStorage.setItem("accessToken", access_token);
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/todo");
    }
  }, [navigate]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickBtn = () => {
    handleSubmit();
  };

  return (
    <Fragment>
      <Container>
        <Wrapper>
          <EmailInput
            type="email"
            data-testid="email-input"
            placeholder="write your email here"
            onChange={onChangeEmail}
          />
          <PasswordInput
            type="password"
            data-testid="password-input"
            placeholder="write your password here"
            onChange={onChangePassword}
          />
          <BtnWrapper>
            <SigninBtn
              disabled={isBtnDisabled}
              data-testid="signin-button"
              onClick={onClickBtn}
            >
              Signin
            </SigninBtn>
            <SignupBtn onClick={handleClick}>Signup</SignupBtn>
          </BtnWrapper>
        </Wrapper>
      </Container>
    </Fragment>
  );
}

export default Signin;
