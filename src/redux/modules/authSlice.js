import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authInstance from "../../axios/auth.api";

const initialState = {
  isLogin: false,
  userId: null,
  avatar: null,
  nickname: "",
  accessToken: null,

  isSignupLoading: false,
  isSignupError: false,
  signupError: false,
  isSignupSuccess: false,
};
//dispatch(loginThunk(payload))
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    const { userId, password } = payload;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_API_URL}/login`,
        { id: userId, password }
      );

      // 로그인은 안됐지만 통신자체가 문제는 아니다
      if (response.data.success) {
        // 초록색
        // 정상적으로 로그인을 했다면
        return response.data;
      }
      // 정상적으로 로그인이 안됐다면 reject 시켜버린다.
      return thunkAPI.rejectWithValue(response.data); // 주황색
    } catch (err) {
      // 빨간색
      alert(err.response.data.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const checkLoginStatus = createAsyncThunk(
  "auth/checkLogin",
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("accessToken") || "";

      authInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      // 유저 정보를 검증을 맡기긴다.
      const response = await authInstance.get("/user");

      // 성공을 하면 ↓ 이게 실행이 될꺼고 실패를 하면 catch로 간다.
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: {
    [loginThunk.fulfilled]: (state, action) => {
      const { accessToken, userId, avatar, nickname } = action.payload;

      state.userId = userId;
      state.avatar = avatar;
      state.nickname = nickname;
      state.accessToken = accessToken;

      state.isLogin = true;
      localStorage.setItem("accessToken", accessToken);
    },
    [loginThunk.rejected]: (state, action) => {
      state.userId = "";
      state.avatar = "";
      state.nickname = "";
      state.accessToken = "";

      state.isLogin = false;
    },
    [checkLoginStatus.fulfilled]: (state, action) => {
      const { userId, avatar, nickname } = action.payload;

      state.userId = userId;
      state.avatar = avatar;
      state.nickname = nickname;

      state.isLogin = true;
    },
    [loginThunk.rejected]: (state, action) => {
      state.userId = "";
      state.avatar = "";
      state.nickname = "";
      state.accessToken = "";

      state.isLogin = false;
    },
  },
});

export const { login, logout, signup } = authSlice.actions;
export const selectAuth = (state) => state;
export default authSlice.reducer;
