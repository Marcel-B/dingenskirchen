import * as React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { DatePicker } from '@mui/lab';
import { FormControl, TextField } from '@mui/material';

interface Props extends UseControllerProps {
  label: string;
  default?: Date | null;
};

export default function AppDatePicker(props: Props) {
  const { field, fieldState } = useController({ ...props, defaultValue: props.default ?? new Date() });

  return (
    <FormControl
      fullWidth
      margin={'dense'}>
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
    </FormControl>
  );
}

