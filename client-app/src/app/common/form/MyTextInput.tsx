import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
}

const MyTextInput = (props: Props) => {
  const [field, meta] = useField(props.name);
  return (
    <TextField
      variant='outlined'
      {...field}
      {...props}
      label={props.placeholder}
      helperText={meta.error}
      error={meta.touched && !!meta.error} />
  );
};

export default MyTextInput;
