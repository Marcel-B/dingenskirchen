import * as React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { DatePicker } from '@mui/lab';
import { FormControl, TextField } from '@mui/material';

interface Props extends UseControllerProps {
  label: string;
};

export default function AppDatePicker(props: Props) {
  const { field, fieldState } = useController({ ...props, defaultValue: new Date() });

  return (
    <FormControl
      fullWidth
      margin={'dense'}>
      <DatePicker
        {...field}
        label={props.label}
        onChange={field.onChange}
        renderInput={(params) =>
          <TextField
            {...params}
            margin={'dense'}
            helperText={fieldState.error?.message}
            error={!!fieldState.error} />}
      />
    </FormControl>
  );
}

