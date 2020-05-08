import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export function District({ currentDistrict }) {
  const classes = useStyles();

  if (currentDistrict !== null) {
    let t = { ...currentDistrict };
    t = { ...t };

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>District</StyledTableCell>
              <StyledTableCell align="right">Confirmed</StyledTableCell>
              <StyledTableCell align="right">Active&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Recovered&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Death&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(t).map((key, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {key}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {t[key].confirmed}
                </StyledTableCell>
                <StyledTableCell align="right">{t[key].active}</StyledTableCell>
                <StyledTableCell align="right">
                  {t[key].recovered}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {t[key].deceased}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <h3>To show District detail Enter India then choose any state </h3>;
}
