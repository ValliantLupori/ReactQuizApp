import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider } from "@mui/styles";
import { createTheme, StyledEngineProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const muiCache = createCache({
  key: "mui",
  prepend: true,
});
const myTheme = createTheme({});
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={myTheme}>
          <CssBaseline />

          <App />
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
