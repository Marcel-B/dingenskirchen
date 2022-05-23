import { Control } from "react-hook-form";
import DaDatePicker from 'ts-control/DaDatePicker';
import DaTextInput from 'ts-control/DaTextInput';
import DaSelect from 'ts-control/DaSelect';
import {
  DatePickerComponent,
  Aquarium,
  DuengungFormValues,
  SelectComponent,
  TextInputComponent,
} from 'shared-types';
import duengungTypeOptions from "../../models/duengungTyp";
import React from "react";

const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppTextInput = DaTextInput as TextInputComponent;
const AppSelect = DaSelect as SelectComponent;

interface Props {
  control: Control<DuengungFormValues, any>;
  aquarien: Aquarium[];
}

const Allgemein = ({aquarien, control}: Props) => {
  return (
    <>
      <AppDatePicker
        control={control}
        default={new Date()}
        label='Datum'
        name='datum'/>
      <AppSelect
        name='duenger'
        defaultValue={null}
        control={control}
        label='Düngung'
        values={duengungTypeOptions}/>
      <AppTextInput
        control={control}
        label='Wert (ml)'
        type='number'
        default={''}
        name='menge'/>
      <AppSelect
        name='aquarium'
        defaultValue={null}
        control={control} label='Aquarium'
        values={aquarien.map(aquarium => {
          return {text: aquarium.name, value: aquarium.id, item: aquarium};
        })}/>
    </>
  );
}

export default Allgemein;