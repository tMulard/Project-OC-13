import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: null,
    profile: null,
  },
  reducers: {
    setIsAuth: (state, isAuth) => {
      state.isAuth = isAuth;
    },
    setToken: (state, token) => {
      state.token = token;
    },
    setProfile: (state, profile) => {
      state.profile = profile;
    },
    logout: (state) => {
      state.isAuth = false,
      state.token = null,
      state.profile = null;
    }
  },
});
/*
export const logIn = (amount: number): AppThunk => (dispatch, getState) => {
    const currentValue = selectCount(getState())

    if (currentValue % 2 === 1 || currentValue % 2 === -1) {
      dispatch(incrementByAmount(amount))
    }
  }
*/

export const { setIsAuth, setToken, setProfile, logout } = AuthSlice.actions;
