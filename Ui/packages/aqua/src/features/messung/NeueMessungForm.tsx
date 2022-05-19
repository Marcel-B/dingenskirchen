import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, Divider, Typography } from '@mui/material';

import DaDatePicker from 'ts-control/DaDatePicker';
import DaTextInput from 'ts-control/DaTextInput';
import DaSelect from 'ts-control/DaSelect';

import { DatePickerComponent, TextInputComponent, SelectComponent, MessungFormValues } from 'shared-types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createMessungAsync } from '../../store/messungSlice';
import messungTypeOptions from '../../models/messungTyp';
import { aquariumSelectors, fetchAquarienAsync } from '../../store/aquariumSlice';

const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppTextInput = DaTextInput as TextInputComponent;
const AppSelect = DaSelect as SelectComponent;

const NeueMessungForm = () => {
  const dispatch = useAppDispatch();
  const aquarien = useAppSelector(aquariumSelectors.selectAll);
  const { control, handleSubmit, reset } = useForm<MessungFormValues>();

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, [dispatch]);

  const onSubmit = (data: MessungFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    dispatch(createMessungAsync(data));
    reset({ datum: new Date() });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{ padding: '2rem' }}>
          <Typography variant='h5'>Neue Messung</Typography>
          <Divider orientation='horizontal' />
          <br />
          <AppDatePicker control={control} default={new Date()} label={'Datum'} name='datum' />
          <AppSelect
            name='wert'
            defaultValue={null}
            control={control}
            label='Wert'
            values={messungTypeOptions} />
          <AppTextInput control={control} label='Menge' type='number' default={''} name='menge' />
          <AppSelect
            name='aquarium'
            defaultValue={null}
            control={control}
            label='Aquarium'
            values={aquarien.map(aquarium => {
              return { text: aquarium.name, value: aquarium.id, item: aquarium };
            })} />
          <br />
          <br />
          <Button variant='contained' type='submit'>Senden</Button>
        </Card>
      </form>
    </>
  );
};

export default NeueMessungForm;
