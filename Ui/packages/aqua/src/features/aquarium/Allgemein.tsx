import DaTextInput from 'ts-control/DaTextInput';
import { AquariumFormValues, TextInputComponent } from "shared-types";
import React from "react";
import { Control } from "react-hook-form";

const AppTextInput = DaTextInput as TextInputComponent;

interface Props {
  control: Control<AquariumFormValues, any>;
}

const Allgemein = ({control}: Props) => {
  return (
    <>
      <AppTextInput control={control} label='Name' type='text' default={''} name='name'/>
      <AppTextInput control={control} label='Liter' type='number' default={''} name='liter'/>
    </>);
}
export default Allgemein;
