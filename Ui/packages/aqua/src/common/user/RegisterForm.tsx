import DaTextInput from 'ts-control/DaTextInput';
import {
  TextInputComponent,
  UserFormValues
} from "shared-types";

const AppTextInput = DaTextInput as TextInputComponent;
import { Control } from "react-hook-form";
import React from "react";

interface Props {
  control: Control<UserFormValues, any>;
}

const RegisterForm = ({control}: Props) => {
  return (
    <>
      <AppTextInput
        control={control}
        label='Angezeigename'
        type='text'
        default={''}
        name='displayName'/>
      <AppTextInput
        control={control}
        label='Benutzername'
        type='text'
        default={''}
        name='username'/>
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
      <AppTextInput
        control={control}
        label='Passwort'
        type='password'
        default={''}
        name='password2'/>
    </>
  );
}

export default RegisterForm;