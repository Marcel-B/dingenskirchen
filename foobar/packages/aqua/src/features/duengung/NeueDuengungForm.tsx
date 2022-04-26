import { Button, Card, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import duengungTypeOptions from '../../models/duengungTyp';

import DaDatePicker from 'ts-control/DaDatePicker';
import DaTextInput from 'ts-control/DaTextInput';
import DaSelect from 'ts-control/DaSelect';
import {
  DatePickerComponent,
  DuengungFormValues,
  SelectComponent,
  TextInputComponent,
} from 'shared-types';
import { useForm } from 'react-hook-form';
import { aquariumSelectors, fetchAquarienAsync } from '../../store/aquariumSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createDuengungAsync } from '../../store/duengungSlice';

const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppTextInput = DaTextInput as TextInputComponent;
const AppSelect = DaSelect as SelectComponent;

const NeueDuengungForm = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<DuengungFormValues>();
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, [dispatch]);

  const onSubmit = (data: DuengungFormValues) => {
    dispatch(createDuengungAsync(data));
    reset({ datum: new Date() });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{ padding: '2rem' }}>
          <Typography variant='h5'>Neue Düngung</Typography>
          <Divider orientation='horizontal' />
          <br />
          <AppDatePicker control={control} default={new Date()} label={'Datum'} name='datum' />
          <AppSelect
            name='typ'
            defaultValue={null}
            control={control} label='Düngung'
            values={duengungTypeOptions} />
          <AppTextInput control={control} label='Wert (ml)' type='number' default={''} name='wert' />
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

export default NeueDuengungForm;