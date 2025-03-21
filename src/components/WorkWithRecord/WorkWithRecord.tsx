import { FC, FormEvent, SyntheticEvent, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import style from "./WorkWithRecord.module.scss";
import { Button, Input } from "@mui/material";
import { IData } from "../../services/types/ui";

interface IWorkWithRecord {
  defData?: IData;
  cancleClick: () => void;
  submitClick: (data: IData) => Promise<unknown>;
}

export const WorkWithRecord: FC<IWorkWithRecord> = ({
  defData,
  cancleClick,
  submitClick,
}) => {
  const [isWait, setIsWait] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const tempDef: IData = defData
    ? {
        companySigDate: dayjs(defData.companySigDate),
        companySignatureName: defData.companySignatureName,
        documentName: defData.documentName,
        documentStatus: defData.documentStatus,
        documentType: defData.documentType,
        employeeNumber: defData.employeeNumber,
        employeeSigDate: dayjs(defData.employeeSigDate),
        employeeSignatureName: defData.employeeSignatureName,
      }
    : {
        companySigDate: dayjs(),
        companySignatureName: "",
        documentName: "",
        documentStatus: "",
        documentType: "",
        employeeNumber: "",
        employeeSigDate: dayjs(),
        employeeSignatureName: "",
      };

  const [data, setData] = useState<IData>(tempDef);

  const changeValue = (key: keyof IData, value: string | Dayjs | null) => {
    if (key in data && value !== null) {
      const temp = { ...data };
      if (
        (key === "companySigDate" || key === "employeeSigDate") &&
        typeof value !== "string"
      ) {
        temp[key] = value;
      } else if (
        key !== "companySigDate" &&
        key !== "employeeSigDate" &&
        typeof value === "string"
      ) {
        temp[key] = value;
      }
      setData(temp);
      setIsDisabled(Object.values(temp).some((value) => value === ""));
    }
  };

  const reset = async (event: SyntheticEvent) => {
    event.preventDefault();
    setData(tempDef);
    cancleClick();
  };

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    setIsWait(true);
    await submitClick(data).finally(() => {
      setIsWait(false);
    });
  };

  return (
    <form className={style.form}>
      <DateTimePicker
        value={data.companySigDate}
        className={style.form__compDate}
        onChange={(event) => {
          changeValue("companySigDate", event);
        }}
      />
      <Input
        required
        error={data.companySignatureName === ""}
        className={style.form__compName}
        value={data.companySignatureName}
        onChange={(event) => {
          changeValue("companySignatureName", event.target.value);
        }}
      />
      <Input
        className={style.form__docName}
        required
        error={data.documentName === ""}
        value={data.documentName}
        onChange={(event) => changeValue("documentName", event.target.value)}
      />
      <Input
        className={style.form__docType}
        required
        error={data.documentType === ""}
        value={data.documentType}
        onChange={(event) => changeValue("documentType", event.target.value)}
      />
      <Input
        className={style.form__docStatus}
        required
        error={data.documentStatus === ""}
        value={data.documentStatus}
        onChange={(event) => changeValue("documentStatus", event.target.value)}
      />
      <Input
        required
        error={data.employeeNumber === ""}
        className={style.form__employNum}
        value={data.employeeNumber}
        onChange={(event) => changeValue("employeeNumber", event.target.value)}
      />
      <DateTimePicker
        className={style.form__employDate}
        value={data.employeeSigDate}
        onChange={(event) => changeValue("employeeSigDate", event)}
      />
      <Input
        error={data.employeeSignatureName === ""}
        required
        className={style.form__employName}
        value={data.employeeSignatureName}
        onChange={(event) =>
          changeValue("employeeSignatureName", event.target.value)
        }
      />
      <Button
        className={style.form__approve + " " + style.button_approve}
        type="submit"
        disabled={isDisabled}
        style={isDisabled ? {} : { color: "#fff", backgroundColor: "#1976d2" }}
        onClick={submitForm}
        loading={isWait}
      >
        Сохранить
      </Button>
      <Button
        className={style.form__reset}
        type="reset"
        onClick={reset}
        loading={isWait}
      >
        Отменить
      </Button>
    </form>
  );
};
