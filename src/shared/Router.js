import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import { data } from "./data";
import { MainContext } from "../context/MainContext";
import { useDispatch, useSelector } from "react-redux";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import { checkLoginStatus } from "../redux/modules/authSlice";
import Layout from "../Layout/Layout";

function Router() {
  const [letters, setLetters] = useState(data);

  return (
    <MainContext.Provider value={{ letters, setLetters }}>
      <BrowserRouter>
        <InnerRouter />
      </BrowserRouter>
    </MainContext.Provider>
  );
}

function InnerRouter() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isLogin = useSelector((state) => {
    return state.authSlice.isLogin;
  });

  useEffect(() => {
    dispatch(checkLoginStatus());
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <>
      <Routes>
        <Route element={isLogin ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to={"/"} />} replace />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export default Router;
