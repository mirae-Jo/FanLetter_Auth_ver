import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LetterBoxPre({ selectedMemberId, memberArr }) {
  const letters = useSelector((store) => store.letterReducer.letters);

  const navigate = useNavigate();
  const goToHandler = (letter) => {
    navigate(`/detail/${letter.id}`);
  };
  const filtered = letters.filter((mem) => {
    return (
      mem.writedTo ===
      memberArr.find((member) => {
        return member.id === selectedMemberId;
      }).name
    );
  });
  console.log(filtered.length);
  return (
    <div>
      <StLetterBox>
        {filtered.length === 0 ? (
          <StNoLetterBox>등록된 편지가 없습니다</StNoLetterBox>
        ) : (
          filtered.map((letter) => {
            return (
              <StLetterWrap
                key={letter.id}
                onClick={() => {
                  goToHandler(letter);
                }}
              >
                <StProfile src={letter.avatar} />
                <StLetterDiv>
                  <StH3>{letter.nickname}</StH3>
                  <StP>{letter.content}</StP>
                </StLetterDiv>
              </StLetterWrap>
            );
          })
        )}
      </StLetterBox>
    </div>
  );
}

const StLetterBox = styled.div`
  width: 580px;
  height: auto;
  min-height: 145px;
  margin: 40px auto;
  border: 2px solid #fff;
`;
const StNoLetterBox = styled.h1`
  text-align: center;
  color: #fff;
  font-size: 1.5rem;
  height: 140px;
  line-height: 140px;
`;
const StLetterWrap = styled.div`
  width: 540px;
  height: 120px;
  padding: 20px 0;
  box-sizing: border-box;
  margin: 10px auto;
  border: 2px solid #fff;
  color: #fff;
  &:hover {
    border: 2px solid aqua;
    color: aqua;
    cursor: pointer;
  }
`;
const StProfile = styled.img`
  width: 80px;
  height: 80px;
  float: left;
  margin-right: 10px;
  border-radius: 50%;
  margin-left: 10px;
`;
const StLetterDiv = styled.div`
  width: 400px;
  height: 90px;
  float: right;
`;
const StH3 = styled.h3`
  font-weight: bold;
  font-size: 1.5rem;
`;
const StP = styled.p`
  width: 380px;
  font-size: 1.2rem;
  margin-top: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default LetterBoxPre;
