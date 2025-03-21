import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOneRecordOnServer } from "../../types/Api";

interface IInitialState {
  list: Array<IOneRecordOnServer>
}

const initalState: IInitialState = {
  list: []
};

export const TableSlice = createSlice({
  name: "Table",
  initialState: initalState,
  reducers: {
    addElements: (
      state,
      action: PayloadAction<Array<IOneRecordOnServer>>
    ) => {
      state.list = state.list.concat(action.payload);
    },
    updateOne: (state, action: PayloadAction<IOneRecordOnServer>) => {
      const index = state.list.findIndex((el) => el.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    removeOne: (state, action: PayloadAction<string>) => {
      const index = state.list.findIndex((el) => el.id === action.payload);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
    removeAll: (state) => {
      state.list = [];
    }
  },
});

export const { addElements, updateOne, removeOne, removeAll } =
  TableSlice.actions;

export const TableReducer = TableSlice.reducer;
