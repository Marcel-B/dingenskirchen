import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, Paper, Typography } from '@mui/material';

import DaDatePicker from 'ts-controls/DaDatePicker';
import DaTextInput from 'ts-controls/DaTextInput';
import DaSelect from 'ts-controls/DaSelect';

import { DatePickerComponent, TextInputComponent, SelectComponent } from 'shared-types';
import { useAppDispatch } from 'ts-app-store/store';
import { createMessungAsync } from 'ts-aqua-store/wertSlice';

const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppTextInput = DaTextInput as TextInputComponent;
const AppSelect = DaSelect as SelectComponent;

const NeueMessung = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    dispatch(createMessungAsync(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} style={{padding: '2rem'}}>
          <Typography>Neue Messung</Typography>
          <Grid container spacing={12}>
            <Grid item>
              <AppDatePicker control={control} default={new Date()} label={'Datum'} name='datum' />
            </Grid>
            <Grid item width={220}>
              <AppSelect
                name='typ'
                defaultValue={null}
                control={control} label='Messung'
                values={[{ text: 'NO₂', value: 1 }, { text: 'NH₂', value: 2 }, { text: 'NO₃', value: 3 }, { text: 'PO₄', value: 4 }, { text: 'FE', value: 5 }]} />
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
