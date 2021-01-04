import axios from "axios";

// Set global headers for axios request
const setAuthToken = (token) => {
  const customToken = `Bearer ${token}`;

  if (token) {
    axios.defaults.headers.common["Authorization"] = customToken;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
