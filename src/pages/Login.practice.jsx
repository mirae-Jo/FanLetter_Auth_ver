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

  const [signupId, setSignupId] = useState({ userId: "" });
  const [signupPw, setSignupPw] = useState({ password: "" });
  const [nickname, setNickname] = useState({ nickname: "" });

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
    // response : 말 많네. 자 저장했다 {message: 회원가입완료, success: true}
    try {
      // 내가 한국말로 잘 전달했나?
      console.log({
        id: signupId.userId,
        password: signupPw.password,
        nickname: nickname.nickname,
      });
      /* 
      객체로 할 거면 차라리 이렇게 하든가
      const [signupObject, setSignupObject] = useState({
        id: '',
        nickname : '',
        password: ''
      })
      아니면 그냥 이렇게 하든가
      const [signupId,setSignupId] = useState('');
      const [signupPw,setSignupPw] = useState('');
      const [nickname,setNickname] = useState('');

      애매한 혼종이 탄생해버림
      const [signupId, setSignupId] = useState('');
      const [signupPw, setSignupPw] = useState({ password: "" });
      const [nickname, setNickname] = useState({ nickname: "" });
      // 여기 있는거 우리가 컨트롤 할 수 있는 부분이다.
      // 더 쉽게 쓸 수 있다.

       */
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id: signupId.userId,
          password: signupPw.password,
          nickname: nickname.nickname,
        }
      ); // 마! 내 아이디 이기고 pwd랑 닉넹미 이긴데 니 서버에 저장좀 해도
      // 응답도 얘가 한국말로 말했으니까 한국말로 대답을 한다
      // {message: '', success: true or false}
      if (response.data.success) {
        // 성공을 했다면 즉, 내가 요청한 내용이 제대로 동작했다면
        alert("회원가입 성공");
      }
    } catch (err) {
      // try중에 발생한 오류를 여기서부터 실행
      // 실패를 했다면
      // 얘가 어떻게 에러를 뱉는지 모르기 때문에 쳐보는 것임
      alert(err.response.data.message);
    }

    /* 
    const [signupId, setSignupId] = useState({ userId: "" });
  const [signupPw, setSignupPw] = useState({ password: "" });
  const [nickname, setNickname] = useState({ nickname: "" });
    */
    setSignupId({ userId: "" });
    setSignupPw({ password: "" });
    setNickname({ nickname: "" });
  };

  const handleClickGoLoginBtn = () => {
    setIsLoginPage(true);
  };
  return (
    <StBody>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home으로 이동
      </button>
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
                    pwValue.length >= 10 && isValidNickname.length >= 10
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
                    isValidNickname.length >= 10
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
`;

const StLetterBox = styled.div`
  width: 580px;
  height: auto;
  margin: 40px auto;
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
