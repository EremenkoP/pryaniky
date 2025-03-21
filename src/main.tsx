import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import './normalize.scss'
import { Provider } from "react-redux";
import { store } from "./services/store/store.ts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/ru";
import { ruRU } from "@mui/x-date-pickers/locales";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={"ru"}
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <App />
      </LocalizationProvider>
    </Provider>
  </StrictMode>
);

