import {Grid, Typography} from "@mui/material";
import React from "react";
import {
    DatePickerComponent,
    TextInputComponent,
    FischFormValues,
    RadioButtonComponent,
    SelectComponent,
} from 'shared-types';
import DaTextInput from 'ts-control/DaTextInput';
import DaDatePicker from 'ts-control/DaDatePicker';
import DaRadioButton from 'ts-control/DaRadioButton';
import DaSelect from 'ts-control/DaSelect';
import {Control} from "react-hook-form";

const AppTextInput = DaTextInput as TextInputComponent;
const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppRadioButton = DaRadioButton as RadioButtonComponent;
const AppSelect = DaSelect as SelectComponent;

interface Props {
    control: Control<FischFormValues, any>;
}

const Werte = ({control}: Props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Typography variant='subtitle1' sx={{pt: 2}}>PH</Typography>
            </Grid>
            <Grid item xs={4}>
                <AppTextInput control={control} label='Von' name='ph.von' default='' type='number'/>
            </Grid>
            <Grid item xs={4}>
                <AppTextInput control={control} label='Bis' name='ph.bis' default='' type='number'/>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='subtitle1' sx={{pt: 2}}>Temp.</Typography>
            </Grid>
            <Grid item xs={4}>
                <AppTextInput
                    control={control} label='Von' name='temperatur.von' default=''
                    type='number'/>
            </Grid>
            <Grid item xs={4}>
                <AppTextInput
                    control={control}
                    label='Bis'
                    name='temperatur.bis'
                    default=''
                    type='number'/>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='subtitle1' sx={{pt: 2}}>GH</Typography>
            </Grid>
            <Grid item xs={4}>
                <AppTextInput control={control} label='Von' name='gh.von' default='' type='number'/>
            </Grid>
            <Grid item xs={4}>
                <AppTextInput control={control} label='Bis' name='gh.bis' default='' type='number'/>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='subtitle1' sx={{pt: 2}}>KH</Typography>
            </Grid>
            <Grid item xs={4}>
                <AppTextInput control={control} label='Von' name='kh.von' default='' type='number'/>
            </Grid>
            <Grid item xs={4}>
                <AppTextInput control={control} label='Bis' name='kh.bis' default='' type='number'/>
            </Grid>
        </Grid>
    );
};

export default Werte;