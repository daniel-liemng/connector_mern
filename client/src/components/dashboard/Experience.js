import React from "react";
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

const Experience = ({ experience }) => {
  const classes = useStyles();

  const experiences = experience.map((exp) => (
    <StyledTableRow key={exp._id}>
      <StyledTableCell component='th' scope='row'>
        {exp.company}
      </StyledTableCell>
      <StyledTableCell align='right'>{exp.title}</StyledTableCell>
      <StyledTableCell align='right'>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </StyledTableCell>
      <StyledTableCell>
        <Button variant='contained' color='secondary'>
          Delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Typography variant='h4' className={classes.title} color='secondary'>
        Experience Credentials
      </Typography>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell align='right'>Title</StyledTableCell>
            <StyledTableCell align='right'>Year</StyledTableCell>
            <StyledTableCell align='right'></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{experiences}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default Experience;
