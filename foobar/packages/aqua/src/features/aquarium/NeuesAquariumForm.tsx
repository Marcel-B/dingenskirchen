import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, Grid, Paper, Typography } from '@mui/material';

import DaDatePicker from 'ts-control/DaDatePicker';
import DaTextInput from 'ts-control/DaTextInput';
import DaSelect from 'ts-control/DaSelect';

import {
  DatePickerComponent,
  TextInputComponent,
  SelectComponent,
  MessungFormValues,
  AquariumFormValues,
} from 'shared-types';
import { useAppDispatch } from '../../store/store';
import { createMessungAsync } from '../../store/messungSlice';
import messungTypeOptions from '../../models/messungTyp';
import { createAquariumAsync } from '../../store/aquariumSlice';

const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppTextInput = DaTextInput as TextInputComponent;
const AppSelect = DaSelect as SelectComponent;

const NeuesAquariumForm = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<AquariumFormValues>();

  const onSubmit = (data: AquariumFormValues) => {
    dispatch(createAquariumAsync(data));
    reset({});
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{ padding: '2rem' }}>
          <Typography>Neues Aquarium</Typography>
          <Grid container spacing={12}>
            <Grid item>
              <AppTextInput control={control} label='Name' type='text' default={''} name='name' />
            </Grid>
            <Grid item>
              <AppTextInput control={control} label='Liter' type='number' default={''} name='liter' />
            </Grid>
          </Grid>
          <Button variant='contained' type='submit'>Senden</Button>
        </Card>
      </form>
    </>
  );
};

export default NeuesAquariumForm;
