import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Todos from "./Todos";
import NotFound from "./NotFound";

function Router() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/todo" element={<Todos />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default Router;
