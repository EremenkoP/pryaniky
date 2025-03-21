import { FC, useState } from "react";
import { IOneRecordOnServer } from "../../services/types/Api";
import style from "./ListElement.module.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Api from "../../services/API/API";
import { useAppDispatch } from "../../hooks/store";
import {
  removeOne,
  updateOne,
} from "../../services/store/TableStore/TableSlace";
import { WorkWithRecord } from "../WorkWithRecord/WorkWithRecord";
import { IData } from "../../services/types/ui";
import dayjs from "dayjs";

export const ListElement: FC<IOneRecordOnServer> = ({
  companySigDate,
  companySignatureName,
  documentName,
  documentStatus,
  documentType,
  employeeNumber,
  employeeSigDate,
  employeeSignatureName,
  id,
}) => {
  const dispatch = useAppDispatch();

  const [isUpdsated, setIsUpdated] = useState<boolean>(false);
  const [isWait, setIsWait] = useState<boolean>(false);

  const updateDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const remove = async () => {
    setIsWait(true);
    await Api.delete(id)
      .then((res) => {
        if (res.error_code === 0) {
          dispatch(removeOne(id));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsWait(false);
      });
  };

  const change = () => {
    setIsUpdated(true);
  };

  const cubmitChange = async (data: IData) => {
    setIsWait(true);
    await Api.update(id, {
      ...data,
      companySigDate: data.companySigDate.toISOString(),
      employeeSigDate: data.employeeSigDate.toISOString(),
    })
      .then((res) => {
        if (res.error_code === 0) {
          dispatch(updateOne(res.data));
          setIsUpdated(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsWait(false);
      });
  };

  const cancellingChanges = () => {
    setIsUpdated(false);
  };

  return (
    <li className={style.li + (isUpdsated ? ` ${style.li_isChange}` : "")}>
      {isUpdsated ? (
        <WorkWithRecord
          defData={{
            companySigDate: dayjs(companySigDate),
            companySignatureName,
            documentName,
            documentStatus,
            documentType,
            employeeNumber,
            employeeSigDate: dayjs(employeeSigDate),
            employeeSignatureName,
          }}
          cancleClick={cancellingChanges}
          submitClick={cubmitChange}
        />
      ) : (
        <div className={style.element}>
          <p>{updateDate(companySigDate)}</p>
          <p>{companySignatureName}</p>
          <p>{documentName}</p>
          <p>{documentType}</p>
          <p>{documentStatus}</p>
          <p>{employeeNumber}</p>
          <p>{updateDate(employeeSigDate)}</p>
          <p>{employeeSignatureName}</p>
          <button
            onClick={change}
            disabled={isWait}
            className={style.button + " " + style.button_change}
          >
            {" "}
            <EditIcon color="success" className={style.icon} />{" "}
          </button>
          <button
            onClick={remove}
            disabled={isWait}
            className={style.button + " " + style.button_remove}
          >
            {" "}
            <DeleteForeverIcon color="error" className={style.icon} />{" "}
          </button>
        </div>
      )}
    </li>
  );
};
