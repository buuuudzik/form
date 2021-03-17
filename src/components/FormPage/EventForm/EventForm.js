import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import { fetchingErrorSelector, submittedSelector } from '../../../store/selectors';
import { fetchWithErrorHandling } from '../../../helpers';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  margin: {
    margin: 10,
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

  const defaultDate = new Date();

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
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <Controller
            name="firstName"
            as={
              <TextField
                id="firstName"
                helperText={getErrorMessage('firstName')}
                variant="outlined"
                label="First Name"
                error={!!getErrorMessage('firstName')}
              />
            }
            control={control}
            defaultValue=""
            rules={{
              required: 'Required',
            }}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <Controller
            name="lastName"
            as={
              <TextField
                id="lastName"
                helperText={getErrorMessage('lastName')}
                variant="outlined"
                label="Last Name"
                error={!!getErrorMessage('lastName')}
              />
            }
            control={control}
            defaultValue=""
            rules={{
              required: 'Required',
            }}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <Controller
            name="email"
            as={
              <TextField
                id="email"
                helperText={getErrorMessage('email')}
                variant="outlined"
                label="Email"
                error={!!getErrorMessage('email')}
              />
            }
            control={control}
            defaultValue=""
            rules={{
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <Controller
            name="eventDate"
            defaultValue={defaultDate}
            render={(props) => {
              return (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Controller
                    name="eventDate"
                    control={control}
                    defaultValue={defaultDate}
                    render={({ ref, ...rest }) => {
                      return (
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="Event Date"
                          format="MM/dd/yyyy"
                          KeyboardButtonProps={{
                            'aria-label': 'Change date',
                          }}
                          {...rest}
                        />
                      );
                    }}
                  />
                </MuiPickersUtilsProvider>
              );
            }}
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value: /^[0-1][0-9]\/[0-3][0-9]\/[2][0-9]{3}$/,
                message: 'Invalid date',
              },
            }}
          />
        </FormControl>
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
