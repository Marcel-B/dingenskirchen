import DaTextInput from 'ts-control/DaTextInput';
import {
  TextInputComponent,
  UserFormValues
} from "shared-types";
import React from "react";
import { Control } from "react-hook-form";

const AppTextInput = DaTextInput as TextInputComponent;

interface Props {
  control: Control<UserFormValues, any>;
}

const LoginForm = ({control}: Props) => {
  return (
    <>
      <AppTextInput
        control={control}
        label='Email'
        type='text'
        default={''}
        name='email'/>
      <AppTextInput
        control={control}
        label='Passwort'
        type='password'
        default={''}
        name='password'/>
    </>);
}
export default LoginForm;
