import React, { useState } from "react";
import ProfileImage from "../../assets/baseline_account_circle_black_48dp.png";
import uuid from "react-uuid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addLetter } from "../../redux/modules/letterReducer";

function LetterInputBox({ memberArr }) {
  const letters = useSelector((store) => store.letterReducer.letters);
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState(memberArr[0].name);
  const [profile] = useState(ProfileImage);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const Formprops = (e) => {
    e.preventDefault();
    const newLetter = {
      avatar: profile,
      id: uuid(),
      writedTo: selected,
      nickname: nickname,
      content: content,
    };
    dispatch(addLetter(newLetter));

    setNickname("");
    setContent("");
  };

  return (
    <div>
      <StMember onSubmit={Formprops}>
        <StCenterWrap>
          <StProfileImg src={ProfileImage} />
          <StOptionWrap>
            <StSendWho>누구에게 보내실건가요?</StSendWho>
            <select onChange={handleSelect}>
              {memberArr.map((member) => {
                return (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                );
              })}
            </select>
          </StOptionWrap>
          <StInputWrap>
            <StSpan>닉네임 : </StSpan>
            <StInput
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              required
            ></StInput>
          </StInputWrap>
          <StInputWrap>
            <StSpan>내용 : </StSpan>
            <StTextarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              required
            ></StTextarea>
            <StInputBtn type="submit">입력</StInputBtn>
          </StInputWrap>
        </StCenterWrap>
      </StMember>
    </div>
  );
}

const StMember = styled.form`
  width: 580px;
  height: 180px;
  margin: 0 auto;
  border-radius: 10px;
  border: 2px solid aqua;
  /* background-image: url(${(props) => props.backgroundImage}); */
  display: block;
  color: #fff;
`;
const StCenterWrap = styled.div`
  width: 540px;
  height: auto;
  margin: 10px auto;
`;
const StProfileImg = styled.img`
  width: 65px;
  float: left;
  margin-top: 8px;
`;
const StOptionWrap = styled.div`
  width: 450px;
  height: 20px;
  margin-top: 10px;
  margin-left: 20px;
  float: left;
`;
const StSendWho = styled.span`
  margin-right: 10px;
`;
const StInputWrap = styled.div`
  width: 450px;
  float: left;
  margin-top: 10px;
  margin-left: 20px;
`;
const StSpan = styled.span`
  float: left;
  width: 70px;
`;
const StInput = styled.input`
  width: 350px;
  height: 25px;
`;
const StTextarea = styled.textarea`
  width: 350px;
  height: 50px;
  display: block;
`;
const StInputBtn = styled.button`
  float: right;
  margin-top: 10px;
  margin-right: 30px;
`;

export default LetterInputBox;
