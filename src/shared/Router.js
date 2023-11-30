import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import { data } from "./data";
import { MainContext } from "../context/MainContext";
import { Provider } from "react-redux";
import store from "../redux/config/configStore";

function Router() {
  const [letters, setLetters] = useState(data);
  return (
    <Provider store={store}>
      <MainContext.Provider value={{ letters, setLetters }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </Provider>
  );
}

export default Router;
