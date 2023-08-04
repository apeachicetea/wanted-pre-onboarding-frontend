import React, { Fragment, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Todo from "./Todo";
import NotFound from "./NotFound";

function Router() {
  const navigate = useNavigate();
  const isAuthorized = localStorage.getItem("accessToken");

  useEffect(() => {
    isAuthorized ? navigate("/") : navigate("/signin");
  }, [isAuthorized, navigate]);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default Router;
