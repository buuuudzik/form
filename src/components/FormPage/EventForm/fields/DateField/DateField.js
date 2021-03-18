import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    margin: {
      margin: 10,
    },
  }));

function TextField(props) {
    const classes = useStyles();
    
    const { name, label, helperText, defaultValue = new Date(), rules, control } = props;

    return (
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <Controller
            name={name}
            defaultValue={defaultValue}
            helperText={helperText}
            render={(props) => {
              return (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ ref, ...rest }) => {
                      return (
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label={label}
                          format="MM/dd/yyyy"
                          variant="outlined"
                          helperText={helperText}
                          error={!!helperText}
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
            rules={rules}
          />
        </FormControl>
    )
}

export default TextField;