import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BuchungFormValues } from '../../../app/models/buchung';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { DatePicker, LoadingButton } from '@mui/lab';
import { intervallOptions, SelectOption } from '../../../app/common/options/categoryOptions';

const BuchungForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BuchungFormValues>({
    mode: 'all',
  });

  const { buchungStore, tagStore: { loadTags } } = useStore();
  const { createBuchung, updateBuchung, loadBuchung, deleteBuchung, addTag, removeTag } =
    buchungStore;
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
        onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Name'
          {...register('name', {
            required: 'Name ist ein Pflichtfeld',
          })}
          type='text'
          fullWidth
          variant={'outlined'}
          margin={'dense'}
          error={!!errors.name}
          helperText={errors?.name?.message}
          name='name' />
        <TextField
          label='Betrag'
          fullWidth
          variant={'outlined'}
          margin={'dense'}
          error={!!errors.betrag}
          helperText={errors?.betrag?.message}
          {...register('betrag', {
            required: 'Betrag ist ein Pflichtfeld',
          })}
          type='number'
          name='betrag' />
        <TextField
          multiline
          fullWidth
          rows={3}
          margin={'dense'}
          error={!!errors.beschreibung}
          helperText={errors?.beschreibung?.message}
          {...register('beschreibung')}
          variant={'outlined'}
          label={'Beschreibung'}
          name='beschreibung'
        />
        <DatePicker
          value={'zeitpunkt'}
          label={'Zeitpunkt'}
          {...register('zeitpunkt')}
          onChange={(newValue) => {
            if (newValue) {
              const d = new Date(newValue);
              console.log(d);
              setValue('zeitpunkt', d);
            }
          }}
          renderInput={(params) =>
            <TextField {...params} fullWidth margin={'dense'}
                       helperText={errors.zeitpunkt?.message} error={!!errors?.zeitpunkt} />}
        />
        <FormControl fullWidth margin={'dense'}>
          <FormLabel>Richtung</FormLabel>
          <RadioGroup
            row
            name='row-radio-buttons-group'>
            <FormControlLabel control={<Radio />} label='Eingang' value={1} {...register('kategorie')} />
            <FormControlLabel control={<Radio />} label='Ausgang' value={2} {...register('kategorie')} />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth margin={'dense'}>
          <InputLabel>Intervall</InputLabel>
          <Select
            {...register('intervall', {
              required: "Fehler"
            })}
            label='Intervall'
            onChange={(e: SelectChangeEvent) => {
              const v = e.target.value as string;
              setValue('intervall', parseInt(v));
            }
            }>
            {intervallOptions.map(option =>
              <MenuItem key={option.value}
                        value={option.value}>{option.text}
              </MenuItem>)}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            variant={'contained'}
            onClick={() => handleDelete(buchung.id)}
          >Löschen</LoadingButton>
          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
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
