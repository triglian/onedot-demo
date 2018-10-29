import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  homeButton: {
    marginTop: 20
  }
});

const HombeButton = ({ classes}) => {
  return(
    <div>
    <Tooltip title="Remove row">
      <IconButton
        component = {Link}
        to = "/"
        color="secondary"
        className={classes.homeButton}
        aria-label="Navigate to home"
      >
        <Icon>home</Icon>
      </IconButton>
    </Tooltip>
    </div>
  )
}

HombeButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HombeButton);