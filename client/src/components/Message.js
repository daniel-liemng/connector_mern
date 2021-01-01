import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const Message = ({ handleClose, type, message }) => {
  return (
    <Alert onClose={handleClose} severity={type}>
      {message}
    </Alert>
  );
};

export default Message;
