import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: null,
    profile: null,
    error: "",
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
    setError: (state, error) => {
      state.error = error;
    },
    logout: (state) => {
      state.isAuth = false,
      state.token = null,
      state.profile = null,
      state.error = "";
    }
  },
  selectors: {
    selectIsAuth : state => state.isAuth,
    selectToken : state => state.token,
    selectProfile : state => state.profile,
    selectError : state => state.error
  }
});

export const logIn = (email, password) => async (dispatch) => {
    
    try {
      const fetchData = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const response = await fetchData.json();
      
      if (response.status === 200 && response.body.token) {
        dispatch(setIsAuth(true))
        dispatch(setToken(response.body.token))
      }

      else if (response.status !== 200 && response.body.token) dispatch(setError(response.status))
    
    } catch (error) {
      dispatch(setError(error.toString()));
    }

}

export const getProfile = (token) => async (dispatch) => {
    try {
      const fetchData = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await fetchData.json();

      if (response.status === 200) {
        dispatch(setProfile(response.body));
      }
    } catch (error) {
      dispatch(setError(error.toString()));
    }
  };

// formulaire d'update en TODO

export const upDate = (firstName, lastName) => async (dispatch) => {

  try {
      const fetchData = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      const response = await fetchData.json();
      
      if (response.status === 200 && response.body.token) {
        dispatch(setIsAuth(true))
        dispatch(setToken(response.body.token))
      }

      else if (response.status !== 200 && response.body.token) dispatch(setError(response.status))
    
    } catch (error) {
      dispatch(setError(error.toString()));
    }
}

export const { setIsAuth, setToken, setProfile, setError, logout } = AuthSlice.actions;
export const { selectIsAuth, selectToken, selectProfile, selectError } = AuthSlice.selectors;
