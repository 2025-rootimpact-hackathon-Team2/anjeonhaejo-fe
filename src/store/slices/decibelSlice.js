import { createSlice } from '@reduxjs/toolkit';

const decibelSlice = createSlice({
  name: 'decibel',
  initialState: {
    value: 0,
    isRecording: false,
  },
  reducers: {
    updateDecibel: (state, action) => {
      state.value = action.payload;
    },
    setIsRecording: (state, action) => {
      state.isRecording = action.payload;
    },
  },
});

export const { updateDecibel, setIsRecording } = decibelSlice.actions;
export default decibelSlice.reducer; 