import * as React from 'react';
import { useForm, useController, UseControllerProps } from 'react-hook-form';
import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';

interface Props extends UseControllerProps {
  label: string;
};

export default function AppDatePicker(props: Props) {
  const { field, fieldState } = useController({ ...props, defaultValue: new Date() });

  return (
    <DatePicker
      {...field}
      label={props.label}
      onChange={field.onChange}
      renderInput={(params) => <TextField {...params} margin={'dense'} />}
    />
  );
}

