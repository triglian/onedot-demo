import React from 'react';
import { connect } from 'react-redux';
import HomeButton from './HomeButton';
import { withStyles } from '@material-ui/core/styles';
import EditDictionaryForm from './EditDictionaryForm';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => ({
  dictionary: _.find(
    state.dictionaries,
    'uid',
    ownProps.match.params.dictionaryid
  )
});

const styles = theme => ({
  newDictionaryButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  }
});

const DictionaryEditPage = ({ dictionary }) => {
  return (
    <div>
      <header className="App-header">
        <HomeButton />
        <h1>Edit dictionary "{dictionary.name}"</h1>
      </header>
      <EditDictionaryForm dictionary={dictionary}></EditDictionaryForm>
    </div>
  );
};

export default connect(mapStateToProps)(withStyles(styles)(DictionaryEditPage));
