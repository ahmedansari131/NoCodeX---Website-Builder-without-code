import React from "react";
import { Container, Footer, Header, Popup } from "./components/index.js";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Header />
        <Outlet />
        <Popup />
        <Footer />
      </Container>
    </>
  );
};

export default App;
