import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',

  initialState: {
    isUserRegistered: false,
    username: '',
    userPassword: '',
    error: false,
    errorText: '',
    redirect: false,
    userFavorites: {},
    userHistory: {},
  },

  reducers: {
    userSignUp(state, action) {
      state.username = action.payload.username;
      state.userPassword = action.payload.password;
      state.isUserRegistered = true;
      state.error = false;
      state.redirect = true;
    },
    userSignUpError(state) {
      state.error = true;
      state.errorText = 'User already exists!';
    },
    userLogIn(state, action) {
      state.isUserRegistered = true;
      state.username = action.payload.username;
      state.userPassword = action.payload.password;
      state.error = false;
      state.redirect = true;
    },
    userLogOut(state) {
      state.isUserRegistered = false;
    },
    loginErrorUserNotRegistered(state) {
      state.error = true;
      state.errorText = 'User is not registered!';
    },
    loginErrorWrongPassword(state) {
      state.error = true;
      state.errorText = 'Wrong password!';
    },
    toUserFavorites(state, action) {
      if (!state.userFavorites[action.payload]) {
        state.userFavorites[action.payload] = true;
      }
    },
    toUserHistory(state, action) {
      if (!state.userHistory[action.payload]) {
        if ((action.payload).trim().length > 0) { //! проверка regexp
          state.userHistory[action.payload] = true;
        }
      }
    },
  }
});

// экспортируем экшены
export const { userSignUp, userLogIn, userLogOut, toUserFavorites, toUserHistory } = userSlice.actions;
// получаем state для useSelector
export const getUsername = state => state.user.username;
export const isUserAuth = state => state.user.isUserRegistered;
export const loginError = state => state.user.error;
export const loginErrorText = state => state.user.errorText;
export const redirect = state => state.user.redirect;
// экспортируем редюсер
export default userSlice.reducer;
