import React from 'react';
import MUITextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    margin: {
      margin: 10,
    },
  }));

function TextField(props) {
    const { name, label, helperText, defaultValue = "", rules, control } = props;

    const classes = useStyles();

    return (
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <Controller
            name={name}
            as={
              <MUITextField
                id={name}
                helperText={helperText}
                variant="outlined"
                label={label}
                error={!!helperText}
              />
            }
            control={control}
            defaultValue={defaultValue}
            rules={rules}
          />
        </FormControl>
    )
}

export default TextField;