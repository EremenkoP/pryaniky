import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./UserStore/userSlace";
import { TableReducer } from "./TableStore/TableSlace";

export const store = configureStore({
  reducer: {
    Table: TableReducer,
    User: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
