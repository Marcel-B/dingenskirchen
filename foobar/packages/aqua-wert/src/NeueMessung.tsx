import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';

const NeueMessung = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3}>
          <Typography>Neue Messung</Typography>
          <Grid container spacing={12}>
            <Grid item>
              <TextField label='Wert' variant='standard' {...register('Wert')} />
            </Grid>
            <Grid item>
              <TextField label='Typ' variant='standard' {...register('Typ')} />
            </Grid>
            <Grid item>
              <TextField label='Datum' variant='standard' {...register('Datum')} />
            </Grid>
          </Grid>
          <Button variant='contained'>Senden</Button>
        </Paper>
      </form>
    </>
  );
};

export default NeueMessung;
