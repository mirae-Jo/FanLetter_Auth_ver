import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../redux/modules/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutBtn = () => {
    dispatch(logout());
  };
  return (
    <StWrap>
      <StHome
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </StHome>
      <StUl>
        <li>내 프로필</li>
        <li onClick={handleLogoutBtn}>Logout</li>
      </StUl>
    </StWrap>
  );
}

const StWrap = styled.div`
  width: 100%;
  height: 30px;
  background-color: #333;
`;

const StHome = styled.h1`
  float: left;
  color: #eee;
  margin-left: 10px;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;
const StUl = styled.ul`
  float: right;
  & > li {
    float: left;
    margin-right: 10px;
    color: #eee;
    font-size: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
`;
export default Navbar;
