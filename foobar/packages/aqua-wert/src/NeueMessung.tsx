import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';

import DaDatePicker from 'ts-controls/DaDatePicker';
import DaTextInput from 'ts-controls/DaTextInput';
import DaSelect from 'ts-controls/DaSelect';

import { DatePickerComponent, TextInputComponent, SelectComponent } from 'shared-types';

const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppTextInput = DaTextInput as TextInputComponent;
const AppSelect = DaSelect as SelectComponent;

const NeueMessung = () => {
  const { control, handleSubmit, register } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const [datum, setDatum] = React.useState<Date | null>(null);
  const [typ, setTyp] = React.useState<string>('');

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3}>
          <Typography>Neue Messung</Typography>
          <Grid container spacing={12}>
            <Grid item>
              <AppDatePicker control={control} default={new Date()} label={'Datum'} name='datum' />
            </Grid>
            <Grid item width={220}>
              <AppSelect
                name='messung'
                defaultValue={null}
                control={control} label='Messung'
                values={[{ text: 'NO2', value: 1 }, { text: 'NH2', value: 2 }, { text: 'NO3', value: 3 }]} />
            </Grid>
            <Grid item>
              <AppTextInput control={control} label='Wert' type='text' default={''} name='wert' />
            </Grid>
          </Grid>
          <Button variant='contained' type='submit'>Senden</Button>
        </Paper>
      </form>
    </>
  );
};

export default NeueMessung;
