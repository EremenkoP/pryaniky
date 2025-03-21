import { FC } from "react";
import { TDataRequest } from "../../services/types/Api";
import style from "./List.module.scss";
import { ListElement } from "../ListElement/ListElement";

interface IList {
  list: TDataRequest;
}

export const List: FC<IList> = ({ list }) => {
  return (
    <ul className={style.ul}>
      <li key={-1} className={style.li}>
        <p className={style.text}>Дата подписания команией</p>
        <p className={style.text}>Название комании</p>
        <p className={style.text}>Имя документа</p>
        <p className={style.text}>Статус документа</p>
        <p className={style.text}>Тип документа</p>
        <p className={style.text}>Номер сотрудника</p>
        <p className={style.text}>Дата подписания сотрудником</p>
        <p className={style.text}>ФИО сотрудника</p>
      </li>
      {list.map((el) => {
        return <ListElement key={el.id} {...el} />;
      })}
    </ul>
  );
};
