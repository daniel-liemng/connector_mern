import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Typography } from "@material-ui/core";
import Moment from "react-moment";
import Snackbar from "@material-ui/core/Snackbar";

import { useProfileContext } from "../../context/profileContext";
import Message from "../Message";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    padding: "0.5rem",
  },
  title: {
    padding: "0.5rem",
    textAlign: "center",
    marginBottom: "1rem",
    marginTop: "1rem",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Education = ({ education }) => {
  const classes = useStyles();

  const { deleteEducation, errors, removeAlert } = useProfileContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    removeAlert();
  };

  const educations = education.map((edu) => (
    <StyledTableRow key={edu._id}>
      <StyledTableCell component='th' scope='row'>
        {edu.school}
      </StyledTableCell>
      <StyledTableCell align='right'>{edu.degree}</StyledTableCell>
      <StyledTableCell align='right'>{edu.fieldofstudy}</StyledTableCell>
      <StyledTableCell align='right'>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </StyledTableCell>
      <StyledTableCell>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            deleteEducation(edu._id);
            if (errors) {
              setSnackbarOpen(true);
            }
          }}
        >
          Delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  ));

  return (
    <TableContainer component={Paper}>
      {errors && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handleSnackbarClose}
        >
          <Message
            handleClose={handleSnackbarClose}
            type={errors.length > 0 ? errors[0].type : "error"}
            message={errors.length > 0 ? errors[0].msg : null}
          />
        </Snackbar>
      )}
      <Typography variant='h4' className={classes.title} color='secondary'>
        Education Credentials
      </Typography>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>School</StyledTableCell>
            <StyledTableCell align='right'>Degree</StyledTableCell>
            <StyledTableCell align='right'>Field of Study</StyledTableCell>
            <StyledTableCell align='right'>Year</StyledTableCell>
            <StyledTableCell align='right'></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{educations}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default Education;
