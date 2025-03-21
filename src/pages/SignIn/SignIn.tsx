import { Button, Input, Modal } from "@mui/material";
import { useState } from "react";
import Api from "../../services/API/API";
import { setCookie } from "../../services/cookie";
import { TOKEN } from "../../services/const";
import { useAppDispatch } from "../../hooks/store";
import { switchAuth } from "../../services/store/UserStore/userSlace";
import style from "./SignIn.module.scss";

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isAwait, setIsAwait] = useState<boolean>(false);

  const getAuth = async () => {
    setIsAwait(true);
    setError('')
    await Api.auth({ username: username, password })
      .then((res) => {
        if (res.error_code === 0) {
          setCookie(TOKEN, res.data.token);
          dispatch(switchAuth(true));
        } else {
          setError("Ошибка авторизации");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsAwait(false);
      });
  };

  return (
    <Modal open={true} className={style.modal}>
      <form onSubmit={getAuth} className={style.form}>
        <Input
          value={username}
          required
          placeholder="Введите имя пользователя"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <Input
          value={password}
          required
          type='password'
          placeholder="Введите пароль"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button type="submit" disabled={isAwait} onClick={getAuth}>
          {isAwait ? "в процессе" : "Войти"}
        </Button>
        {
          error && <label className={style.text + ' ' + style.text_error}>{error}</label>
        }
      </form>
    </Modal>
  );
};
