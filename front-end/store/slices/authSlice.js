import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: null,
    profile: null,
    error: "",
    successUpdate: false,
    errorUpdate: null,
  },
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccessUpdate: (state, action) => {
      state.successUpdate = action.payload;
    },
    setErrorUpdate: (state, action) => {
      state.errorUpdate = action.payload;
    },
    logout: (state) => {
      state.isAuth = false,
      state.token = null,
      state.profile = null,
      state.error = "",
      state.successUpdate = false,
      state.errorUpdate = null;
    }
  },
  selectors: {
    selectIsAuth : state => state.isAuth,
    selectToken : state => state.token,
    selectProfile : state => state.profile,
    selectError : state => state.error,
    selectSuccessUpdate : state => state.successUpdate,
    selectErrorUpdate : state => state.errorUpdate
  }
});

export const { setIsAuth, setToken, setProfile, setError, logout, setSuccessUpdate, setErrorUpdate } = AuthSlice.actions;
export const { selectIsAuth, selectToken, selectProfile, selectError, selectErrorUpdate, selectSuccessUpdate } = AuthSlice.selectors;

export const logIn = (email, password) => async (dispatch) => {
    dispatch(setError(null));
    try {
      const fetchData = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const response = await fetchData.json();
      
      if (response.status === 200 && response && response.body && response.body.token) {
        dispatch(setIsAuth(true))
        dispatch(setToken(response.body.token))
      }

      else if (response.status !== 200) dispatch(setError(response.message ? response.message : response.status))
      
    } catch (error) {
      dispatch(setError(error.toString()));
    }

}

export const getProfile = () => async (dispatch, getState) => {
    try {
      //console.log('state', getState())
      const token = getState().auth.token;
      //console.log('token', token)
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

export const upDate = (firstName, lastName) => async (dispatch, getState) => {
  try {
      dispatch(setSuccessUpdate(false));
      dispatch(setErrorUpdate(null));
      const token = getState().auth.token;

      const fetchData = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify({ firstName, lastName }),
      });

      const response = await fetchData.json();
      
      if (response.status === 200 && response.body) {
        dispatch(setSuccessUpdate(true));
        dispatch(setProfile(response.body));
      }

      else if (response.status !== 200 && response.body.token) dispatch(setError(response.status))
    
    } catch (error) {
      dispatch(setErrorUpdate(error.toString()));
      dispatch(setError(error.toString()));
    }
}
