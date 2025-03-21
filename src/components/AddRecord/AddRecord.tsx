import { Button } from "@mui/material";
import { useState } from "react";
import { IOneRecord } from "../../services/types/Api";
import style from "./AddRecord.module.scss";
import Api from "../../services/API/API";
import { useAppDispatch } from "../../hooks/store";
import { addElements } from "../../services/store/TableStore/TableSlace";
import { IData } from "../../services/types/ui";
import { WorkWithRecord } from "../WorkWithRecord/WorkWithRecord";

export const AddRecord = () => {
  const dispatch = useAppDispatch();

  const [isAdd, setIsAdd] = useState<boolean>(false);

  const reset = () => {
    setIsAdd(false);
  };

  const submitForm = async (data: IData) => {
    const temp: IOneRecord = {
      ...data,
      companySigDate: data.companySigDate.toISOString(),
      employeeSigDate: data.employeeSigDate.toISOString(),
    };
    await Api.create(temp).then((res) => {
      if (res.error_code === 0) {
        dispatch(addElements([res.data]));
        reset();
      }
    });
  };

  return (
    <div className={style.element}>
      {isAdd ? (
        <WorkWithRecord cancleClick={reset} submitClick={submitForm} />
      ) : (
        <Button
          onClick={() => setIsAdd(true)}
          style={{
            color: "#fff",
            backgroundColor: "#1976d2",
          }}
          type="button"
        >
          Добавить строку
        </Button>
      )}
    </div>
  );
};
