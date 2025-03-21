import { Dayjs } from "dayjs";
import { IOneRecord } from "./Api";

export interface IData extends Omit<IOneRecord, "companySigDate" | "employeeSigDate"> {
  companySigDate: Dayjs;
  employeeSigDate: Dayjs;
}
