import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { UserProvider } from "./context/userContext";
import { ProfileProvider } from "./context/profileContext";

import App from "./App";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <UserProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </UserProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
