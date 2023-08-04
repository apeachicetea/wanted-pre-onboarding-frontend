import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signin");
    }
  }, []);

  return <Fragment>Todo Page</Fragment>;
}

export default Todo;
