import React from "react";
import Landing from "./pages/Landing";
import { Container, Footer, Header } from "./components/index.js";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Header />
        <Outlet />
        <Footer/>
      </Container>
    </>
  );
};

export default App;
