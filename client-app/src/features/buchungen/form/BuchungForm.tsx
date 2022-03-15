import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BuchungFormValues } from '../../../app/models/buchung';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel, InputLabel, MenuItem, Paper, Radio,
  RadioGroup, Select, SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AppDatePicker from '../../../app/common/form/AppDatePicker';
import AppTextInput from '../../../app/common/form/AppTextInput';
import AppCheckbox from '../../../app/common/form/AppCheckbox';
import { AppRadioButton } from '../../../app/common/form/AppRadioButton';
import AppSelect from '../../../app/common/form/AppSelect';
import { intervallOptions } from '../../../app/common/options/categoryOptions';

const BuchungForm = () => {
  const {
    control,
    handleSubmit,
  } = useForm();

  const { buchungStore, tagStore: { loadTags } } = useStore();
  const { loadBuchung, deleteBuchung, addTag, removeTag } = buchungStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [buchung, setBuchung] = useState<BuchungFormValues>(new BuchungFormValues());

  const handleDelete = (id: string | undefined) => {
    if (id) {
      deleteBuchung(id)
        .then(() => navigate('/app/buchungen'))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    loadTags().catch(error => console.log(error));
    if (id) {
      loadBuchung(id)
        .then((buchung) => setBuchung(new BuchungFormValues(buchung)))
        .catch((error) => console.log(error));
    }
  }, [id, loadBuchung, loadTags, addTag, removeTag]);

  const onSubmit = (data: BuchungFormValues) => {
    console.log('buchung form', data);
    /*
        if (buchung.id) {
          updateBuchung(buchung)
            .then(() => navigate('/app/buchungen'))
            .catch((error) => console.log(error));
        } else {
          let newBuchung = {
            ...buchung,
            id: uuid(),
          };
          createBuchung(newBuchung)
            .then(() => navigate('/app/buchungen'))
            .catch((error) => console.log(error));
        }
    */
  };

  return (
    <Container component={Paper} maxWidth='sm' sx={{ p: 4 }}>
      <Typography variant={'h3'} component={'h1'}>Neue Buchung</Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(data => console.log(data))}>
        <AppTextInput
          label='Name'
          type='text'
          control={control}
          name='name' />
        <AppTextInput
          label='Betrag'
          type='number'
          control={control}
          name='betrag' />
        <AppTextInput
          multiline
          rows={3}
          control={control}
          label={'Beschreibung'}
          name='beschreibung'
        />
        <AppDatePicker label={'Zeitpunkt'}
                       control={control}
                       name={'zeitpunkt'} />
        <AppCheckbox control={control} label={'foo'} name={'bar'} />
        {/*<FormControl fullWidth margin={'dense'}>*/}
        {/*  <FormLabel>Richtung</FormLabel>*/}
        <RadioGroup
          row
          name='row-radio-buttons-group'>
          <AppRadioButton control={control} label={'Eingang'} value={1} name={'kategorie'} />
          <AppRadioButton control={control} label={'Ausgang'} value={2} name={'kategorie'} />
          {/*
            <FormControlLabel control={<Radio />} label='Eingang' value={1} {...register('kategorie')} />
            <FormControlLabel control={<Radio />} label='Ausgang' value={2} {...register('kategorie')} />
*/}
        </RadioGroup>
        {/*</FormControl>*/}
        <AppSelect control={control} label={'Intervall'} values={intervallOptions} name={'intervall'} />
        {/*<FormControl fullWidth margin={'dense'}>*/}
        {/*  <InputLabel>Intervall</InputLabel>*/}
        {/*  <Select*/}
        {/*    value=''*/}
        {/*    {...register('intervall')}*/}
        {/*    label='Intervall'*/}
        {/*    onChange={(e: SelectChangeEvent) => {*/}
        {/*      const v = e.target.value as string;*/}
        {/*      const value = parseInt(v) ?? null;*/}
        {/*      console.log('Value', value);*/}
        {/*      setValue('intervall', value);*/}
        {/*    }}>*/}
        {/*    {intervallOptions.map(option =>*/}
        {/*      <MenuItem key={option.value}*/}
        {/*                value={option.value}>{option.text}*/}
        {/*      </MenuItem>)}*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <LoadingButton
            // loading={isSubmitting}
            // disabled={!isValid}
            variant={'contained'}
            onClick={() => handleDelete(buchung.id)}
          >Löschen</LoadingButton>
          <LoadingButton
            // loading={isSubmitting}
            // disabled={!isValid}
            type='submit'
            style={{ marginLeft: '1rem' }}
            variant={'contained'}
          >Speichern</LoadingButton>
        </Box>
      </Box>
    </Container>
  )
    ;
};
export default observer(BuchungForm);
