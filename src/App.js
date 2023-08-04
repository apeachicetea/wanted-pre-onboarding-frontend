import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
