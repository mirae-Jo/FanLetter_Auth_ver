import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../../shared/data";
import axios from "axios";

// 초기값 설정

const initialState = {
  letters: data,
};

const jsonServer = axios.create({
  baseURL: process.env.REACT_APP_LETTER_API_URL,
});

export const getLetter = createAsyncThunk("letter/getLetter", async () => {
  try {
    const response = await jsonServer.get("/letters");
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const postLetter = createAsyncThunk(
  "letter/postLetter",
  async (payload, thunkAPI) => {
    try {
      const response = await jsonServer.post("/letters", payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const letterSlice = createSlice({
  name: "handleLetter",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      state.letters = [...state.letters, action.payload];
    },
    updateLetter: (state, action) => {
      state.letters = state.letters.map((letter) => {
        return letter.id === action.payload.id ? action.payload : letter;
      });
    },
    deleteLetter: (state, action) => {
      state.letters = state.letters.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },
  extraReducers: {
    [getLetter.fulfilled]: (state, action) => {
      state.letters = action.payload;
    },
    [postLetter]: (state, action) => {
      state.letters = [...state.letters, action.payload];
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addLetter, updateLetter, deleteLetter } = letterSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default letterSlice.reducer;
