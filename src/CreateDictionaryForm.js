import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addDictionary,
  clearValidatedDictionary,
  validateDictionary
} from './actions/';
import { Formik, Form, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import uniqid from 'uniqid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SeverityErrorsList from './SeverityErrorsList'
import './CreateDictionaryForm.css';

const styles = theme => ({
  severityErrorContainer: {
    width: '180px',
    fontSize: '0.7em',
    marginLeft: '-180px',
  },
  leftMargin: {
    marginLeft: theme.spacing.unit
  },
  formButton: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const DictionarySchema = Yup.object().shape({
  name: Yup.string(),
  rows: Yup.array()
    .of(
      Yup.object().shape({
        domain: Yup.string()
          .min(1, 'Cannot be empty')
          .required('Required'),
        range: Yup.string()
          .min(1, 'Cannot be empty')
          .required('Required')
      })
    )
    .required('Must have rows')
    .min(1, 'Must have at least 1 row')
});

const mapStateToProps = state => ({
  cErrorsPerRow: state.validatedDictionary.validationErrors
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addDictionary,
      clearValidatedDictionary,
      validateDictionary
    },
    dispatch
  );


class CreateDictionaryForm extends Component {
  
  componentWillUnmount(){
    this.props.clearValidatedDictionary();
  }

  render(){  
    const { classes, addDictionary, validateDictionary, history, cErrorsPerRow } = this.props;
    
    return (
      <Formik
        initialValues={{
          name: '',
          rows: [{ domain: '', range: '' }]
        }}
        validationSchema={DictionarySchema}
        onSubmit={(values, formikBag) => {
          values.uid = uniqid.time();
          values.createdAt = new Date();
          values.lastModifiedAt = new Date();
          addDictionary(values);

          //navigate to home
          history.push('/');
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting
        }) => (
          <Form>
            <div className="form-row">
              <TextField
                name="name"
                label="Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
              />
            </div>

            <FieldArray
              name="rows"
              render={arrayHelpers => {
                const RowArrayErrors = errors => {
                  return typeof errors.rows === 'string' ? (
                    <div>{errors.rows}</div>
                  ) : null;
                };

                const hasRowArrayError = (name, touched, errors) => {
                  const error = getIn(errors, name);
                  const touch = getIn(touched, name);
                  return touch && error ? true : false;
                };

                const helperTextForRowArrayError = (name, touched, errors) => {
                  const error = getIn(errors, name);
                  const touch = getIn(touched, name);
                  return touch && error ? error : '';
                };

                return (
                  <div>
                    {RowArrayErrors(errors)}

                    {values.rows.map((row, index) => (
                      <div className="form-row" key={index}>

                        <div className={classes.severityErrorContainer}>{
                          cErrorsPerRow && cErrorsPerRow[index] && cErrorsPerRow[index]
                            ? <SeverityErrorsList errors={cErrorsPerRow[index]} />
                            : ''
                        }</div>

                        <div className={classes.leftMargin}>{index + 1}.</div>
                        <TextField
                          className={classes.leftMargin}
                          name={`rows.${index}.domain`}
                          label="Domain"
                          margin="normal"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={hasRowArrayError(
                            `rows.${index}.domain`,
                            touched,
                            errors
                          )}
                          helperText={helperTextForRowArrayError(
                            `rows.${index}.domain`,
                            touched,
                            errors
                          )}
                        />

                        <TextField
                          className={classes.leftMargin}
                          name={`rows.${index}.range`}
                          label="Range"
                          margin="normal"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={hasRowArrayError(
                            `rows.${index}.range`,
                            touched,
                            errors
                          )}
                          helperText={helperTextForRowArrayError(
                            `rows.${index}.range`,
                            touched,
                            errors
                          )}
                        />

                        <Tooltip title="Remove row">
                          <IconButton
                            color="secondary"
                            className={classes.button}
                            aria-label="Remove current row"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <Icon>remove</Icon>
                          </IconButton>
                        </Tooltip>
                      </div>
                    ))}

                    <div className="form-row">
                      <Tooltip title="Add row">
                        <IconButton
                          color="secondary"
                          className={classes.button}
                          aria-label="Add a row"
                          onClick={() =>
                            arrayHelpers.push({ domain: '', range: '' })
                          }
                        >
                          <Icon>add</Icon>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                );
              }}
            />

            <div className="form-row">
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                color="primary"
                className={classes.formButton}
              >
                Create
              </Button>

              <Button
                variant="contained"
                disabled={isSubmitting}
                color="secondary"
                className={classes.formButton}
                onClick={ () => validateDictionary(values)}
              >
                Validate Consistency
              </Button>
            </div>
          </Form>
        )}
      />
    );
  }
}

CreateDictionaryForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(CreateDictionaryForm)));
