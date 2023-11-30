import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const StAll = styled.div`
  background-color: #333;
`;

function Home() {
  return (
    <StAll>
      <Header />
      <Main />
      <Footer />
    </StAll>
  );
}

export default Home;
