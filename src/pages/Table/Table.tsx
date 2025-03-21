import { useEffect } from "react";
import style from './Table.module.scss';
import Api from "../../services/API/API";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { TableSelector } from "../../services/store/TableStore/TableSelector";
import { addElements } from "../../services/store/TableStore/TableSlace";
import { isAuthSelector } from "../../services/store/UserStore/UserSelector";
import { List } from "../../components/List/List";
import { AddRecord } from "../../components/AddRecord/AddRecord";

export const Tables = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(isAuthSelector);
  const list = useAppSelector(TableSelector);

  const getData = async () => {
    await Api.getData()
      .then((res) => {
        if (res.error_code === 0) {
          dispatch(addElements(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isAuth) {
      getData();
    }
  }, [isAuth]);

  return (
    <article className={style.article}>
      <List list={list}  />
      <AddRecord />
    </article>
  );
};
