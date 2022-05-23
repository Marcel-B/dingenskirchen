import {Control} from "react-hook-form";
import {Grid} from "@mui/material";
import geschlechtTypOptions from "../../models/geschlechtTyp";
import React from "react";
import {
    DatePickerComponent,
    Aquarium,
    FischFormValues,
    TextInputComponent,
    RadioButtonComponent,
    SelectComponent,
} from 'shared-types';
import DaTextInput from 'ts-control/DaTextInput';
import DaDatePicker from 'ts-control/DaDatePicker';
import DaRadioButton from 'ts-control/DaRadioButton';
import DaSelect from 'ts-control/DaSelect';

const AppTextInput = DaTextInput as TextInputComponent;
const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppRadioButton = DaRadioButton as RadioButtonComponent;
const AppSelect = DaSelect as SelectComponent;

interface Props {
    control: Control<FischFormValues, any>;
    aquarien: Aquarium[];
}

const Allgemein = ({control, aquarien}: Props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <AppTextInput
                    control={control}
                    label='Name'
                    name='name'
                    default=''
                    type='text'/>
            </Grid>
            <Grid item xs={6}>
                <AppTextInput
                    control={control}
                    label='Wissenschaftlich'
                    name='wissenschaftlich'
                    default=''
                    type='text'/>
            </Grid>
            <Grid item xs={6}>
                <AppTextInput
                    control={control}
                    label='Herkunft'
                    name='herkunft'
                    default=''
                    type='text'/>
            </Grid>
            <Grid item xs={6}>
                <AppTextInput
                    control={control}
                    label='Schwimmzone'
                    name='schwimmzone' default=''
                    type='text'/>
            </Grid>
            <Grid item xs={6}>
                <AppDatePicker control={control} default={new Date()} label={'Datum'} name='datum'/>
            </Grid>
            <Grid item xs={6}>
                <AppSelect
                    name='aquarium'
                    defaultValue={null}
                    control={control} label='Aquarium'
                    values={aquarien.map(aquarium => {
                        return {text: aquarium.name, value: aquarium.id, item: aquarium};
                    })}/>
            </Grid>
            <Grid item xs={6}>
                <AppTextInput
                    control={control} label='Anzahl' name='anzahl' default='' type='number'/>
            </Grid>
            <Grid item xs={6}>
                <AppRadioButton
                    name='geschlecht'
                    defaultValue={null}
                    control={control}
                    label='Geschlecht'
                    values={geschlechtTypOptions}/>
            </Grid>
        </Grid>
    )
};

export default Allgemein;