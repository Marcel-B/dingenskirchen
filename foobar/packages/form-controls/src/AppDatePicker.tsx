import * as React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { FormControl, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import deLocale from 'date-fns/locale/de';

interface Props extends UseControllerProps {
  label: string;
  default?: Date | null;
}

const AppDatePicker = (props: Props) => {
  const { field, fieldState } = useController({ ...props, defaultValue: props.default ?? new Date() });

  return (
    <FormControl
      fullWidth
      margin={'dense'}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
        <DatePicker
          {...field}
          label={props.label}
          mask={'__.__.____'}
          onChange={field.onChange}
          renderInput={(params) =>
            <TextField
              {...params}
              margin={'dense'}
              helperText={fieldState.error?.message}
              error={!!fieldState.error} />}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default AppDatePicker;

