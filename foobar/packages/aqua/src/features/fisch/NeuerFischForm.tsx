import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import {
  DatePickerComponent,
  TextInputComponent,
  FischFormValues,
  RadioButtonComponent,
  SelectComponent,
} from 'shared-types';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createFischAsync } from '../../store/fischSlice';
import DaTextInput from 'ts-control/DaTextInput';
import DaDatePicker from 'ts-control/DaDatePicker';
import DaRadioButton from 'ts-control/DaRadioButton';
import DaSelect from 'ts-control/DaSelect';
import React, { useEffect } from 'react';
import geschlechtTypOptions from '../../models/geschlechtTyp';
import { aquariumSelectors, fetchAquarienAsync } from '../../store/aquariumSlice';


const AppTextInput = DaTextInput as TextInputComponent;
const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppRadioButton = DaRadioButton as RadioButtonComponent;
const AppSelect = DaSelect as SelectComponent;

const NeuerFischForm = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<FischFormValues>();
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, []);

  const onSubmit = (data: FischFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    dispatch(createFischAsync(data));
    reset({});
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{ padding: '2rem' }}>
          <Typography variant='h5'>Neuer Fisch</Typography>
          <Divider orientation='horizontal' />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AppTextInput control={control} label='Name' name='name' default='' type='text' />
              <AppTextInput control={control} label='Wissenschaftlich' name='wissenschaftlich' default='' type='text' />
            </Grid>
            <Grid item xs={6}>
              <AppTextInput control={control} label='Herkunft' name='herkunft' default='' type='text' />
              <AppTextInput control={control} label='Schwimmzone' name='schwimmzone' default='' type='text' />
            </Grid>
            <Grid item xs={6}>
              <AppTextInput control={control} label='Anzahl' name='anzahl' default='' type='number' />
            </Grid>
            <Grid item xs={6}>
              <AppRadioButton
                name='geschlecht'
                defaultValue={null}
                control={control}
                label='Geschlecht'
                values={geschlechtTypOptions} />
            </Grid>
            <Grid item xs={6}>
              <AppDatePicker control={control} default={new Date()} label={'Datum'} name='datum' />
            </Grid>
            <Grid item xs={6}>
              <AppSelect
                name='aquarium'
                defaultValue={null}
                control={control} label='Aquarium'
                values={aquarien.map(aquarium => {
                  return { text: aquarium.name, value: aquarium.id, item: aquarium };
                })} />
            </Grid>
            <Grid item xs={12}>
              <Divider orientation='horizontal' />
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6'>PH-Wert</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AppTextInput control={control} label='Von' name='ph.von' default='' type='number' />
                </Grid>
                <Grid item xs={6}>
                  <AppTextInput control={control} label='Bis' name='ph.bis' default='' type='number' />
                </Grid>
              </Grid>
              <Typography variant='h6'>Temperatur</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AppTextInput control={control} label='Von' name='temperatur.von' default='' type='number' />
                </Grid>
                <Grid item xs={6}>
                  <AppTextInput control={control} label='Bis' name='temperatur.bis' default='' type='number' />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6'>Gesamthärte</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AppTextInput control={control} label='Von' name='gh.von' default='' type='number' />
                </Grid>
                <Grid item xs={6}>
                  <AppTextInput control={control} label='Bis' name='gh.bis' default='' type='number' />
                </Grid>
              </Grid>
              <Typography variant='h6'>Karbonhärte</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AppTextInput control={control} label='Von' name='kh.von' default='' type='number' />
                </Grid>
                <Grid item xs={6}>
                  <AppTextInput control={control} label='Bis' name='kh.bis' default='' type='number' />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <br />
          <Button variant='contained' type='submit'>Senden</Button>
        </Card>
      </form>
    </>
  );
};
export default NeuerFischForm;