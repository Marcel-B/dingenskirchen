import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BuchungFormValues } from '../../../app/models/buchung';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { parse } from 'date-fns';

const schema = yup.object({
  name: yup.string().required(),
  betrag: yup.number().required(),
  beschreibung: yup.string(),
  zeitpunkt: yup.date().required(),
}).required();

const BuchungForm = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<BuchungFormValues>({
    resolver: yupResolver(schema),
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
    console.log('buchung form', buchung.tags);
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
  };

  return (
    <>
      <h2>Neue Buchung</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Name'
          {...register('name')}
          type='text'
          fullWidth
          variant={'outlined'}
          margin={'dense'}
          error={!!errors.name}
          helperText={errors?.name}
          name='name' />
        <TextField
          label='Betrag'
          fullWidth
          variant={'outlined'}
          margin={'dense'}
          error={!!errors.betrag}
          helperText={errors?.betrag}
          {...register('betrag')}
          type='number'
          name='betrag' />
        <TextField
          multiline
          fullWidth
          rows={3}
          margin={'dense'}
          error={!!errors.beschreibung}
          helperText={errors?.beschreibung}
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
            console.log(newValue);
            if (newValue){
              const d = new Date(newValue);
              console.log(d);
              setValue('zeitpunkt', d);
            }
          }}
          renderInput={(params) => <TextField {...params} fullWidth margin={'dense'}
                                              helperText={errors.zeitpunkt?.message} error={!!errors?.zeitpunkt} />}
        />
        {/*<MyDateInput*/}
        {/*  placeholderText='Zeitpunkt'*/}
        {/*  name='zeitpunkt'*/}
        {/*  timeCaption='time'*/}
        {/*  dateFormat='d. MMM yyyy'*/}
        {/*/>*/}
        {/*<MySelectInput*/}
        {/*  options={kategorieOptions}*/}
        {/*  placeholder='Kategorie'*/}
        {/*  name='kategorie'*/}
        {/*/>*/}
        {/*<MySelectInput*/}
        {/*  options={intervallOptions}*/}
        {/*  placeholder='Intervall'*/}
        {/*  name='intervall'*/}
        {/*/>*/}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button
            variant={'contained'}
            onClick={() => handleDelete(buchung.id)}
          >Löschen</Button>
          <Button
            type='submit'
            style={{ marginLeft: '1rem' }}
            variant={'contained'}
          >Speichern</Button>
        </div>
      </form>
    </>
  );
};
export default observer(BuchungForm);
