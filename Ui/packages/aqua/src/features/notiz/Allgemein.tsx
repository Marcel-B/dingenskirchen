import { Control } from "react-hook-form";
import { Aquarium, DatePickerComponent, NotizFormValues, SelectComponent, TextInputComponent } from 'shared-types';
import DaDatePicker from 'ts-control/DaDatePicker';
import DaTextInput from 'ts-control/DaTextInput';
import DaSelect from 'ts-control/DaSelect';

const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppTextInput = DaTextInput as TextInputComponent;
const AppSelect = DaSelect as SelectComponent;

interface Props {
  control: Control<NotizFormValues, any>;
  aquarien: Aquarium[];
}

const Allgemein = ({control, aquarien}: Props) => {
  return (
    <>
      <AppDatePicker control={control} default={new Date()} label='Datum' name='datum'/>
      <AppSelect
        name='aquarium'
        defaultValue={null}
        control={control}
        label='Aquarium'
        values={aquarien.map(aquarium => {
          return {
            text: aquarium.name,
            value: aquarium.id,
          };
        })}/>
      <AppTextInput control={control} label='Text' type='text' default='' name='text'/>
      <AppTextInput control={control} label='Tag' type='text' default='' name='tag'/>
    </>);
};

export default Allgemein;