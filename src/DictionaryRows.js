import React from 'react';
import PropTypes from 'prop-types';
import SeverityErrorsList from './SeverityErrorsList';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DictionaryRow from './DictionaryRow';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

const DictionaryRows = ({ classes, rows, isDisplayingConsistencyErrors, cErrorsPerRow }) => {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell>Range</TableCell>
            {isDisplayingConsistencyErrors ? <TableCell>Consistency Errors</TableCell> : ''}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => {
            return (
              <DictionaryRow row={row}
                idx={idx + 1}
                key={row.uid}
                isDisplayingConsistencyErrors={isDisplayingConsistencyErrors}
                cErrors={cErrorsPerRow[idx] || []}
               />
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

DictionaryRows.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DictionaryRows);
