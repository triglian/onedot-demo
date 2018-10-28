import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const styles = theme => ({
  defaultTableButton: {
    backgroundColor: theme.palette.primary.contrastText,
    margin: theme.spacing.unit
  }
});

const DictionariesTableRow = props => {
  const { classes, row, idx } = props;
  return (
    <TableRow key={row.uid}>
      <TableCell component="th" scope="row">
        {idx}
      </TableCell>
      <TableCell>{row.uid}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>
        <Moment format="YYYY/MM/DD HH:mm:ss">
          {row.createdAt.toISOString()}
        </Moment>
      </TableCell>
      <TableCell>
        <Moment format="YYYY/MM/DD HH:mm:ss">
          {row.lastModifiedAt.toISOString()}
        </Moment>
      </TableCell>
      <TableCell>
        <IconButton
          component={Link}
          to={`/view/${row.uid}`}
          aria-label="View"
          className={classes.defaultTableButton}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          component={Link}
          to={`/edit/${row.uid}`}
          aria-label="Edit"
          className={classes.defaultTableButton}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          component={Link}
          to={`/delete/${row.uid}`}
          aria-label="Delete"
          className={classes.defaultTableButton}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

DictionariesTableRow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DictionariesTableRow);
