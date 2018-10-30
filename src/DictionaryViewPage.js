import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { validateDictionary } from './actions/';
import PropTypes from 'prop-types';
import HomeButton from './HomeButton';
import DictionaryDeleteDialog from './DictionaryDeleteDialog';
import Button from '@material-ui/core/Button';
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
  ),
  cErrorsPerRow: state.validatedDictionary.validationErrors
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      validateDictionary
    },
    dispatch
  );

const styles = theme => ({
  defaultButton: {
    margin: theme.spacing.unit
  },
  validateButton: {
    marginTop: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

class DictionaryViewPage extends Component {
  constructor(props){
    super(props);
    this.state = {
        isDeleteDialogOpen: false,
        isDisplayingConsistencyErrors: false
    };
  }

  componentWillUnmount(){
    clearTimeout(this.timeoutId);
  }

  openDialog() {
    this.setState({isDeleteDialogOpen: true})
  }

  closeDialog() {
    // for some bizzare reason the synchronous version
    // doesn't close the modal
    this.timeoutId = setTimeout(() => {
       this.setState({isDeleteDialogOpen: false})
     }, 1)
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <HomeButton />
          <h1>Dictionary "{this.props.dictionary.name}"</h1>
        </header>

        <section className="actions ">
          <div>
            <Button
              variant="contained"
              color="secondary"
              className={this.props.classes.validateButton}
              onClick={ () => {
                validateDictionary(this.props.dictionary);
                this.setState({isDisplayingConsistencyErrors: true})
              }}
            >
              Validate Consistency
            </Button>
          </div>

          <div className="text-right">
            <Tooltip title="Edit dictionary">
              <IconButton
                color="primary"
                component={Link}
                to={`/edit/${this.props.dictionary.uid}`}
                aria-label="Edit"
                className={this.props.classes.defaultButton}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete dictionary">
              <IconButton
                aria-label="Delete"
                className={this.props.classes.defaultButton}
                onClick={this.openDialog.bind(this)}
              >
                <DictionaryDeleteDialog
                  dictionary={this.props.dictionary}
                  isOpen={this.state.isDeleteDialogOpen}
                  closeDialog={this.closeDialog.bind(this)}
                />
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </section>

        <DictionaryRows 
          rows={this.props.dictionary.rows}
          isDisplayingConsistencyErrors={this.state.isDisplayingConsistencyErrors}
          cErrorsPerRow={this.props.cErrorsPerRow || []}
         />

      </div>
    );
  }
};

DictionaryViewPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withStyles(styles)(DictionaryViewPage));