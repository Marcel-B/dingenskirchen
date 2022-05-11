import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, Divider, Typography } from '@mui/material';

import DaTextInput from 'ts-control/DaTextInput';

import {
  TextInputComponent,
  AquariumFormValues,
} from 'shared-types';
import { useAppDispatch } from '../../store/store';
import { createAquariumAsync } from '../../store/aquariumSlice';

const AppTextInput = DaTextInput as TextInputComponent;

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
          <Typography variant='h5'>Neues Aquarium</Typography>
          <Divider orientation='horizontal' />
          <br />
          <AppTextInput control={control} label='Name' type='text' default={''} name='name' />
          <AppTextInput control={control} label='Liter' type='number' default={''} name='liter' />
          <br />
          <br />
          <Button variant='contained' type='submit'>Senden</Button>
        </Card>
      </form>
    </>
  );
};

export default NeuesAquariumForm;
