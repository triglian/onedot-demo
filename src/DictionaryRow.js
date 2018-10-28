import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const DictionaryRow = props => {
  const { classes, row, idx } = props;
  return (
    <TableRow key={row.uid}>
      <TableCell component="th" scope="row">
        {idx}
      </TableCell>
      <TableCell>{row.domain}</TableCell>
      <TableCell>{row.range}</TableCell>
    </TableRow>
  );
};

DictionaryRow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default DictionaryRow;
