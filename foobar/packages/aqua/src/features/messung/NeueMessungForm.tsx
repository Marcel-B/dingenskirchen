import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, Grid, Paper, Typography } from '@mui/material';

import DaDatePicker from 'ts-control/DaDatePicker';
import DaTextInput from 'ts-control/DaTextInput';
import DaSelect from 'ts-control/DaSelect';

import { DatePickerComponent, TextInputComponent, SelectComponent, MessungFormValues } from 'shared-types';
import { useAppDispatch } from '../../store/store';
import { createMessungAsync } from '../../store/messungSlice';
import messungTypeOptions from '../../models/messungTyp';

const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppTextInput = DaTextInput as TextInputComponent;
const AppSelect = DaSelect as SelectComponent;

const NeueMessung = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<MessungFormValues>();

  const onSubmit = (data: MessungFormValues) => {
    dispatch(createMessungAsync(data));
    reset({ datum: new Date() });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{ padding: '2rem' }}>
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
                values={messungTypeOptions} />
            </Grid>
            <Grid item>
              <AppTextInput control={control} label='Wert' type='text' default={''} name='wert' />
            </Grid>
          </Grid>
          <Button variant='contained' type='submit'>Senden</Button>
        </Card>
      </form>
    </>
  );
};

export default NeueMessung;
