import messungTypeOptions from "../../models/messungTyp";

const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppTextInput = DaTextInput as TextInputComponent;
const AppSelect = DaSelect as SelectComponent;

import DaDatePicker from 'ts-control/DaDatePicker';
import DaTextInput from 'ts-control/DaTextInput';
import DaSelect from 'ts-control/DaSelect';

import { DatePickerComponent, TextInputComponent, SelectComponent, MessungFormValues, Aquarium } from 'shared-types';
import React from "react";
import { Control } from "react-hook-form";

interface Props {
  control: Control<MessungFormValues, any>;
  aquarien: Aquarium[];
}

const Allgemein = ({control, aquarien}: Props) => {
  return (
    <>
      <AppDatePicker
        control={control}
        default={new Date()}
        label={'Datum'}
        name='datum'/>
      <AppSelect
        name='wert'
        defaultValue={null}
        control={control}
        label='Wert'
        values={messungTypeOptions}/>
      <AppTextInput
        control={control}
        label='Menge'
        type='number'
        default={''}
        name='menge'/>
      <AppSelect
        name='aquarium'
        defaultValue={null}
        control={control}
        label='Aquarium'
        values={aquarien.map(aquarium => {
          return {text: aquarium.name, value: aquarium.id, item: aquarium};
        })}/>
    </>
  )
    ;

}
export default Allgemein;