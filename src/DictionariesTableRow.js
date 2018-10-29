import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DictionaryDeleteDialog from './DictionaryDeleteDialog';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const styles = theme => ({
  defaultTableButton: {
    backgroundColor: theme.palette.primary.contrastText,
    margin: theme.spacing.unit
  }
});

class DictionariesTableRow extends Component {
  constructor(props){
    super(props);
    this.state = {
        isDeleteDialogOpen: false
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

  render () {
    return (
      <TableRow key={this.props.row.uid}>
        <TableCell component="th" scope="row">
          {this.props.idx}
        </TableCell>
        <TableCell>{this.props.row.uid}</TableCell>
        <TableCell>{this.props.row.name}</TableCell>
        <TableCell>
          <Moment format="YYYY/MM/DD HH:mm:ss">
            {this.props.row.createdAt.toISOString()}
          </Moment>
        </TableCell>
        <TableCell>
          <Moment format="YYYY/MM/DD HH:mm:ss">
            {this.props.row.lastModifiedAt.toISOString()}
          </Moment>
        </TableCell>
        <TableCell>
          <IconButton
            component={Link}
            to={`/view/${this.props.row.uid}`}
            aria-label="View"
            className={this.props.classes.defaultTableButton}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={`/edit/${this.props.row.uid}`}
            aria-label="Edit"
            className={this.props.classes.defaultTableButton}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            className={this.props.classes.defaultTableButton}
            onClick={this.openDialog.bind(this)}
          >
            <DeleteIcon />
            <DictionaryDeleteDialog
              dictionary={this.props.row}
              isOpen={this.state.isDeleteDialogOpen}
              closeDialog={this.closeDialog.bind(this)}
            />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
};

DictionariesTableRow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DictionariesTableRow);
