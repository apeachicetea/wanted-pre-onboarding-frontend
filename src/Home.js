import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthorized = localStorage.getItem("accessToken");
    if (!isAuthorized) navigate("/signin");
  }, [navigate]);

  return <Fragment>Home Page</Fragment>;
}

export default Home;
