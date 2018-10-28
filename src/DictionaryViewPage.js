import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';
import DictionaryRows from './DictionaryRows';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './DictionaryViewPage.css';

const mapStateToProps = (state, ownProps) => ({
  dictionary: _.find(
    state.dictionaries,
    'uid',
    ownProps.match.params.dictionaryid
  )
});

const styles = theme => ({
  defaultButton: {
    // backgroundColor: theme.palette.primary.contrastText,
    margin: theme.spacing.unit
  }
});

const DictionaryViewPage = ({ classes, dictionary }) => {
  return (
    <div>
      <header className="App-header">
        <h1>Dictionary "{dictionary.name}"</h1>
      </header>

      <section className="actions text-right">
        <Tooltip title="Edit dictionary">
          <IconButton
            color="secondary"
            component={Link}
            to={`/edit/${dictionary.uid}`}
            aria-label="Edit"
            className={classes.defaultButton}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete dictionary">
          <IconButton
            component={Link}
            to={`/delete/${dictionary.uid}`}
            aria-label="Delete"
            className={classes.defaultButton}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </section>

      <DictionaryRows rows={dictionary.rows} />
    </div>
  );
};

export default connect(mapStateToProps)(withStyles(styles)(DictionaryViewPage));
