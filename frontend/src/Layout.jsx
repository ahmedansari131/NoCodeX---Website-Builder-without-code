import React from "react";
import { Container, Footer, Header } from "./components/index";
import { Error404 } from "./pages/index";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <Container>
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Layout;
