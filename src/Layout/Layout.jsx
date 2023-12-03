import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
