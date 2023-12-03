import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginThunk } from "../redux/modules/authSlice";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [isLoginPage, setIsLoginPage] = useState(true);

  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const [signupId, setSignupId] = useState("");
  const [signupPw, setSignupPw] = useState("");
  const [nickname, setNickname] = useState("");

  // const [isValid, setIsValid] = useState(false);
  const [isValidId, setIsValidId] = useState(false);
  const [isValidPw, setIsValidPw] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      userId: loginId,
      password: loginPw,
    };
    dispatch(loginThunk(user));
    setLoginId("");
    setLoginPw("");
  };

  const handleClickGoSignupBtn = () => {
    setIsLoginPage(false);
  };

  const handleClickSignupBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id: signupId.userId,
          password: signupPw.password,
          nickname: nickname.nickname,
        }
      );
      if (response.data.success) {
        alert("회원가입");
        setIsLoginPage(true);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
    setSignupId(signupId.userId);
    setSignupPw(signupPw.password);
    setNickname(nickname.nickname);
  };

  const handleClickGoLoginBtn = () => {
    setIsLoginPage(true);
  };
  return (
    <StBody>
      <StLetterBox>
        <StLetterWrap>
          {isLoginPage === true ? (
            <>
              <StLetterForm onSubmit={handleLogin}>
                <input
                  value={loginId}
                  type="id"
                  placeholder="아이디를 입력하세요"
                  minLength={4}
                  maxLength={10}
                  required
                  onChange={(e) => {
                    const idValue = e.target.value;
                    setLoginId(idValue);
                    idValue === true ? setIsValidId(true) : setIsValidId(false);
                  }}
                />
                <input
                  value={loginPw}
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  minLength={4}
                  maxLength={15}
                  required
                  onChange={(e) => {
                    const pwValue = e.target.value;
                    setLoginPw(pwValue);
                    pwValue.length >= 4
                      ? setIsValidPw(true)
                      : setIsValidPw(false);
                  }}
                />
                <LoginBtn
                  type="submit"
                  disabled={!isValidId && !isValidPw}
                  $isValid={!isValidId && !isValidPw}
                >
                  로그인
                </LoginBtn>
                <GoSignupBtn onClick={handleClickGoSignupBtn}>
                  회원가입하기
                </GoSignupBtn>
              </StLetterForm>
            </>
          ) : (
            <>
              <StLetterForm>
                <input
                  value={signupId.userId}
                  type="text"
                  placeholder="아이디를 입력하세요"
                  minLength={4}
                  maxLength={10}
                  required
                  onChange={(e) => {
                    const idValue = e.target.value;
                    setSignupId({ userId: idValue });
                    idValue === true ? setIsValidId(true) : setIsValidId(false);
                  }}
                />
                <input
                  value={signupPw.password}
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  minLength={4}
                  maxLength={15}
                  required
                  onChange={(e) => {
                    const pwValue = e.target.value;
                    setSignupPw({ password: pwValue });
                    pwValue.length >= 4 && isValidNickname.length >= 2
                      ? setIsValidPw(true)
                      : setIsValidPw(false);
                  }}
                />
                <input
                  value={nickname.nickname}
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  minLength={1}
                  maxLength={10}
                  required
                  onChange={(e) => {
                    const isValidNickname = e.target.value;
                    setNickname({ nickname: isValidNickname });
                    isValidNickname.length >= 2
                      ? setIsValidNickname(true)
                      : setIsValidNickname(false);
                  }}
                />
              </StLetterForm>
              <StBtnWrap>
                <SignupBtn
                  onClick={handleClickSignupBtn}
                  disabled={!isValidId && !isValidPw && !isValidNickname}
                  $isValid={!isValidId && !isValidPw && !isValidNickname}
                >
                  회원가입
                </SignupBtn>
                <GoLoginBtn onClick={handleClickGoLoginBtn}>
                  로그인하기
                </GoLoginBtn>
              </StBtnWrap>
            </>
          )}
        </StLetterWrap>
      </StLetterBox>
    </StBody>
  );
}

const StBody = styled.div`
  background-color: #bbb;
  height: 100vh;
  padding: 40px;
`;

const StLetterBox = styled.div`
  width: 580px;
  height: auto;
  margin: 0 auto;
  border: 2px solid #fff;
  color: #fff;
  background-color: #eee;
`;
const StLetterWrap = styled.div`
  width: 540px;
  padding: 20px 0;
  margin: 10px auto;
`;
const StLetterForm = styled.form`
  width: 430px;
  margin: 0 auto;
  input {
    width: 100%;
    padding: 10px;
    margin: 5px auto;
  }
`;

const LoginBtn = styled.button`
  display: block;
  width: 430px;
  height: 40px;
  font-size: 1rem;
  margin: 10px auto;
  border: none;
  background-color: ${(props) => (props.$isValid ? "transparent" : "#00acac")};
  color: ${(props) => (props.$isValid ? "#bbb" : "#fff")};
  &:hover {
    cursor: ${(props) => (props.$isValid ? "default" : "pointer")};
  }
`;
const GoSignupBtn = styled.button`
  display: block;
  width: 430px;
  height: 40px;
  margin: 0 auto;
  font-size: 1rem;
  border: none;
  background-color: transparent;
  color: #bbb;
`;

const StBtnWrap = styled.div`
  width: 430px;
  margin: 0 auto;
`;

const SignupBtn = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  font-size: 1rem;
  margin: 10px 0;
  border: none;
  background-color: ${(props) => (props.$isValid ? "transparent" : "#00acac")};
  color: ${(props) => (props.$isValid ? "#bbb" : "#fff")};
  &:hover {
    cursor: ${(props) => (props.$isValid ? "default" : "pointer")};
  }
`;

const GoLoginBtn = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  font-size: 1rem;
  border: none;
  background-color: transparent;
  color: #bbb;
`;

export default Login;
