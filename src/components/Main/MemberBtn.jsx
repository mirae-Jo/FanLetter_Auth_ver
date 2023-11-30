import styled from "styled-components";

function MemberBtn({ selectedMemberId, MemberInputHandler, memberArr }) {
  return (
    <div>
      <StWrap>
        {memberArr.map((member) => {
          return (
            <StBtn
              key={member.id}
              borderColor="aqua"
              onClick={() => {
                MemberInputHandler(member.id);
              }}
              selected={selectedMemberId === member.id}
            >
              {member.name}
            </StBtn>
          );
        })}
      </StWrap>
    </div>
  );
}
const StWrap = styled.div`
  width: 600px;
  margin: 0 auto;
  display: flex;
`;
const StBtn = styled.button`
  width: 100px;
  height: 50px;
  border: 2px solid ${(props) => props.bordercolor}; // 4.부모 컴포넌트에서 보낸 props를 받아 사용합니다.
  border-radius: 20px;
  margin: 30px auto;
  background-color: ${(props) => (props.selected ? "aqua" : "transparent")};
  color: ${(props) => (props.selected ? "navy" : "aqua")};
  font-weight: 900;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
    background-color: aqua;
    color: navy;
  }
`;

export default MemberBtn;
