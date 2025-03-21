import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { TOKEN } from "../services/const";
import { getCookie } from "../services/cookie";
import { isAuthSelector } from "../services/store/UserStore/UserSelector";
import "./App.css";
import { SignIn } from "./SignIn/SignIn";
import { switchAuth } from "../services/store/UserStore/userSlace";
import { Tables } from "./Table/Table";
import { Header } from "../components/Header/Header";

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);

  const checkIsAuth = () => {
    const token = getCookie(TOKEN);
    if (token) {
      dispatch(switchAuth(true));
    }
  };

  useEffect(() => {
    checkIsAuth();
  }, []);

  return (
    <>
      <Header />
      <Tables />
      {!isAuth && <SignIn />}
    </>
  );
}

export default App;
