import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { deleteDictionary } from './actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const mapDispatchToProps = dispatch => 
  bindActionCreators(
    {
      deleteDictionary
    },
    dispatch
);





const DictionaryDeleteDialog = withRouter(
  ({ isOpen, closeDialog, history, dictionary, deleteDictionary }) => {
  return (
    <div>
     <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Dictionary?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will not be able to retrieve this dictionary once it has been deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            deleteDictionary(dictionary)
            closeDialog()
            history.push('/');
          }} color="secondary">
            Delete
          </Button>
          <Button onClick={closeDialog} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

});

export default connect(
  null,
  mapDispatchToProps
)(DictionaryDeleteDialog);
