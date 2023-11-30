import { data } from "../../shared/data";
// action type 설정
const ADD = "LETTER/ADD";
const UPDATE = "LETTER/UPDATE";
const DELETE = "LETTER/DELETE";
// action 생성자 함수 설정
export const addLetter = (newletter) => {
  return {
    type: ADD,
    newletter,
  };
};

export const updateLetter = (newletter) => {
  return {
    type: UPDATE,
    payload: newletter,
  };
};

export const deleteLetter = (id) => {
  return {
    type: DELETE,
    payload: id,
  };
};
// 초기값 설정

const initialState = {
  letters: data,
};
// reducer 설정
// dispatch를 실행하면 redux자체에서 reducer함수를 실행함.
// 그떄 state는 redux 자체에서 알아서 넣어주고 action은 action생성자 함수를 통해 내가 컨트롤
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        letters: [...state.letters, action.newletter],
      };
    case UPDATE:
      return {
        letters: state.letters.map((letter) => {
          return letter.id === action.payload.id ? action.payload : letter;
        }),
      };
    case DELETE:
      return {
        letters: state.letters.filter((item) => {
          return item.id !== action.payload;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
