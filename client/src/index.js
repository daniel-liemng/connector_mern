import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { UserProvider } from "./context/userContext";
import { ProfileProvider } from "./context/profileContext";
import { PostProvider } from "./context/postContext";

import App from "./App";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <UserProvider>
        <ProfileProvider>
          <PostProvider>
            <App />
          </PostProvider>
        </ProfileProvider>
      </UserProvider>
    </MuiPickersUtilsProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
