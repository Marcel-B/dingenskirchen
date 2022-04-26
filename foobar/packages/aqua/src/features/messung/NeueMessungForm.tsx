import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, Typography } from '@mui/material';

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
    dispatch(createMessungAsync(data));
    reset({ datum: new Date() });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{ padding: '2rem' }}>
          <Typography variant='h5'>Neue Messung</Typography>
          <hr />
          <AppDatePicker control={control} default={new Date()} label={'Datum'} name='datum' />
          <AppSelect
            name='typ'
            defaultValue={null}
            control={control} label='Messung'
            values={messungTypeOptions} />
          <AppTextInput control={control} label='Wert' type='number' default={''} name='wert' />
          <AppSelect
            name='aquarium'
            defaultValue={null}
            control={control} label='Aquarium'
            values={aquarien.map(o => {
              return { text: o.name, value: o.id };
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