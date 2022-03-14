import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import React from 'react';
import { useField } from 'formik';

const MyDateInput = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <></>
/*
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        autoComplete="off"
        selected={(field.value && new Date(field.value)) || null}
        onChange={value => helpers.setValue(value)} />
      {meta.touched && meta.error ? (
        <Label basic color={`red`}>{meta.error}</Label>
      ) : null}
    <Form.Field>
*/
  );
};

export default MyDateInput;
