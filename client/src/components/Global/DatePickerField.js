import React from "react";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        clearable
        name={field.name}
        value={field.value}
        helperText={currentError}
        error={Boolean(currentError)}
        format="yyyy-MM-DD"
        minDate={new Date("1900-01-01")}
        onError={(error) => {
          // handle as a side effect
          if (error !== "") {
            if (error !== currentError) {
              form.setFieldError(field.name, error);
            }
          }
        }}
        // if you are using custom validation schema you probably want to pass `true` as third argument
        onChange={(date) => form.setFieldValue(field.name, date, false)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerField;
