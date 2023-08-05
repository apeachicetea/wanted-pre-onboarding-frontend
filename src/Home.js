import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.button`
  cursor: pointer;
`;

const Text = styled.h1``;

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/todo");
  };

  useEffect(() => {
    const isAuthorized = localStorage.getItem("accessToken");
    if (!isAuthorized) navigate("/signin");
  }, [navigate]);

  return (
    <Fragment>
      <Btn onClick={handleClick}>TodoList</Btn>
      <Text>Home Page</Text>
    </Fragment>
  );
}

export default Home;
