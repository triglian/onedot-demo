import React from 'react';
import HomeButton from './HomeButton';
import { withStyles } from '@material-ui/core/styles';
import CreateDictionaryForm from './CreateDictionaryForm';

const styles = theme => ({
  newDictionaryButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  }
});

const DictionaryCreatePage = props => {
  return (
    <div>
      <header className="App-header">
        <HomeButton />
        <h1>Create new dictionary</h1>
      </header>
      <CreateDictionaryForm></CreateDictionaryForm>
    </div>
  );
};

export default withStyles(styles)(DictionaryCreatePage);
