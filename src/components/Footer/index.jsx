import React from "react";
import styled from "styled-components";

const StFooter = styled.footer`
  height: 100px;
  background-color: #333;
  color: #eee;
  text-align: center;
  line-height: 100px;
`;

function Footer() {
  return (
    <div>
      <StFooter>푸터</StFooter>
    </div>
  );
}

export default Footer;
