import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialStateValue = {
  id: '',
  email: '',
  name: '',
  role: '',
  factory: '',
  department: '',
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialStateValue;
    },
    updateUser: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, (state) => {
      state.value = initialStateValue;
    });
  },
});

export const { 
  login, 
  logout,
  updateUser,
 } = userSlice.actions;

export default userSlice.reducer;
