import React from 'react';
import SeverityErrorsList from './SeverityErrorsList';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const DictionaryRow = ({
  row,
  idx,
  isDisplayingConsistencyErrors,
  cErrors
}) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {idx}
      </TableCell>
      <TableCell>{row.domain}</TableCell>
      <TableCell>{row.range}</TableCell>
      {isDisplayingConsistencyErrors ? (
        <TableCell>
          <SeverityErrorsList errors={cErrors} />
        </TableCell>
      ) : null}
    </TableRow>
  );
};

export default DictionaryRow;
