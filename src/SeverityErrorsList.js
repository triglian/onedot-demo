import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  ERR_DUPLICATE_ROW,
  ERR_FORK,
  ERR_CYCLE,
  ERR_CHAIN
} from './constants/ErrorTypes';

import {
  SEVERITY_DUPLICATE_ROW,
  SEVERITY_FORK,
  SEVERITY_CHAIN,
  SEVERITY_CYCLE
} from './constants/SeverityTypes';

const styles = theme => ({
  severityListItem:{
    margin: '2px 0',
    padding: '2px 5px',
    listStyle: 'none',
    borderRadius: '3px'
  },
  severity0: {
    backgroundColor: '#FFF59D',
  },
  severity1: {
    backgroundColor: '#FFCC80',
  },
  severity2: {
    backgroundColor: '#FF8A80',
  },
  severity3: {
    backgroundColor: '#EF5350',
  },
});


const errorMessages = {}
errorMessages[ERR_DUPLICATE_ROW] = 'Duplicate';
errorMessages[ERR_FORK] = 'Fork';
errorMessages[ERR_CYCLE] = 'Cycle';
errorMessages[ERR_CHAIN] = 'Chain';

const errorsToSeverities = {}
errorsToSeverities[ERR_DUPLICATE_ROW] = SEVERITY_DUPLICATE_ROW;
errorsToSeverities[ERR_FORK] = SEVERITY_FORK;
errorsToSeverities[ERR_CYCLE] = SEVERITY_CYCLE;
errorsToSeverities[ERR_CHAIN] = SEVERITY_CHAIN;

const severityClasses = {}
severityClasses[SEVERITY_DUPLICATE_ROW] = 'severity0';
severityClasses[SEVERITY_FORK] = 'severity1';
severityClasses[SEVERITY_CHAIN] = 'severity2';
severityClasses[SEVERITY_CYCLE] = 'severity3';

const SeverityErrorsList = ({ errors, classes }) => {
  const leErrors = Array.isArray(errors) ?  errors : [];
  const errorItems = leErrors.map((err, idx) => 
    <li key={idx} className={`${classes[severityClasses[errorsToSeverities[err.type]]]} ${classes.severityListItem}`}>
      {`${errorMessages[err.type]} - rows: (${err.indexA + 1},${err.indexB + 1})`}
    </li>
  );
  return(
    <ul>
      {errorItems}
    </ul>
  );
}

SeverityErrorsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SeverityErrorsList);