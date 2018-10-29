import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import DictionariesTable from './DictionariesTable';

const mapStateToProps = state => ({
  dictionaries: state.dictionaries
});

const styles = theme => ({
  newDictionaryButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  }
});

const DictionaryListPage = props => {
  return (
    <div>
      <header className="App-header">
        <h1>React Dictionary App</h1>
      </header>
      <DictionariesTable rows={props.dictionaries} />
      <Tooltip title="Create a new dictionary">
        <Button
          component={ Link }
          to="/create"
          variant="fab"
          color="primary"
          aria-label="Add"
          className={props.classes.newDictionaryButton}
        >
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
};

export default connect(mapStateToProps)(withStyles(styles)(DictionaryListPage));

// <header className="App-header">
//             <h1>React Dictionary App</h1>
//         </header>
//         <DictionariesTable rows={this.props.dictionaries}></DictionariesTable>
//         <Tooltip title="Create a new dictionary">
//           <Button variant="fab" color="primary" aria-label="Add" className={this.classes.newDictionaryButton}>
//             <AddIcon />
//           </Button>
//         </Tooltip>
