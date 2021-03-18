import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { fetchingErrorSelector, submittedSelector } from '../../../store/selectors';
import { emailRegExp, dateRegExp, fetchWithErrorHandling } from '../../../helpers';
import TextField from './fields/TextField/TextField';
import DateField from './fields/DateField/DateField';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formError: {
    color: "red",
  }
}));

function EventForm({ submitted, fetchError, setFetching, setFetched }) {
  const classes = useStyles();

  const {
    handleSubmit,
    errors: fieldsErrors,
    control,
  } = useForm();
  
  const onSubmit = async (data) => {
    // Send to server in as a timestamp
    data.eventDate = data.eventDate.getTime();

    setFetching();

    const timeoutId = setTimeout(() => setFetched("Timeout"), 10000);

    const setFetchedWithTimeout = (...args) => {
      clearTimeout(timeoutId);
      setFetched(...args);
    };

    const [err] = await fetchWithErrorHandling("/form", data);
    setFetchedWithTimeout(err ? err : false);
  };

  const getErrorMessage = (fieldName) => {
    const fieldError = fieldsErrors[fieldName];
    return fieldError ? fieldError.message : null;
  };

  const hasErrors = Object.keys(fieldsErrors).length > 0;

  const canSubmit = !hasErrors && !submitted;

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <GroupAddTwoToneIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        New Event
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          name="firstName"
          label="First Name"
          helperText={getErrorMessage('firstName')}
          rules={{
            required: 'Required',
          }}
          control={control}
        />
        <TextField
          name="lastName"
          label="Last Name"
          helperText={getErrorMessage('lastName')}
          rules={{
            required: 'Required',
          }}
          control={control}
        />
        <TextField
          name="email"
          label="Email Address"
          helperText={getErrorMessage('email')}
          rules={{
            required: 'Required',
            pattern: {
              value: emailRegExp,
              message: 'Invalid email address',
            },
          }}
          control={control}
        />
        <DateField
          name="eventDate"
          label="Event Date"
          helperText={getErrorMessage('eventDate')}
          rules={{
            required: 'Required',
            pattern: {
              value: dateRegExp,
              message: 'Invalid date',
            },
          }}
          control={control}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color={'primary'}
          className={classes.submit}
          disabled={!canSubmit}
        >
          Send
        </Button>
      </form>
      {fetchError ? <div className={classes.formError}>{fetchError}</div> : null}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFetching: () => dispatch({ type: 'FETCHING' }),
    setFetched: (errorMessage) => dispatch({ type: 'FETCHED', payload: errorMessage }),
  };
};

export default connect(state => ({
  ...fetchingErrorSelector(state),
  ...submittedSelector(state)
}), mapDispatchToProps)(EventForm);
