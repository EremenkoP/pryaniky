import { RootState } from "../store";

export const TableSelector = (state: RootState) => state.Table.list;