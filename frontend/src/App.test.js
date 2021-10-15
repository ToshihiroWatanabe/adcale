import { render } from "@testing-library/react";
import App from "App";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({});
const history = createMemoryHistory();

test("トップページに「カレンダーを作る」が描画されている事", () => {
  history.push("/");
  const { getByText } = render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  );
  expect(getByText("カレンダーを作る")).toBeInTheDocument();
});

test("/newページに「カレンダーを作る」が描画されている事", () => {
  history.push("/new");
  const { getByText } = render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  );
  expect(getByText("カレンダーを作る")).toBeInTheDocument();
});
