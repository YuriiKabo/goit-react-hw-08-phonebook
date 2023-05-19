import { createSlice } from '@reduxjs/toolkit';

export const myFilterSlice = createSlice({
  name: 'myFilter',
  initialState: '',
  reducers: {
    getFlter(state, action) {
      return state = action.payload;
    },
  },
});
export const { getFlter } = myFilterSlice.actions;
