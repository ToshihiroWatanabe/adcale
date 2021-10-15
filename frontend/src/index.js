import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, blue } from "@mui/material/colors";

/** MUIのテーマ */
const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CssBaseline>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
