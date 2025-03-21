import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitalState {
  isAuth: boolean;
}

const initalState: IInitalState = {
  isAuth: false,
};

export const UserSlice = createSlice({
  name: "User",
  initialState: initalState,
  reducers: {
    switchAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { switchAuth } = UserSlice.actions;

export const UserReducer = UserSlice.reducer;