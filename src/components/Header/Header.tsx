import { Button } from "@mui/material"
import { useAppDispatch } from "../../hooks/store"
import { TOKEN } from "../../services/const"
import { deleteCookie } from "../../services/cookie"
import { switchAuth } from "../../services/store/UserStore/userSlace"
import { removeAll } from "../../services/store/TableStore/TableSlace"
import style from './Header.module.scss';

export const Header = () => {
  
  const dispatch = useAppDispatch()

  const logOut = () => {
    dispatch(switchAuth(false))
    dispatch(removeAll());
    deleteCookie(TOKEN)
  }
  
  return (
    <header className={style.header}>
      <Button onClick={logOut}> Выйти из аккаунта </Button>
    </header>
  );
}