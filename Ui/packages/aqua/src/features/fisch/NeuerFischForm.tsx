import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import {
  FischFormValues,
} from 'shared-types';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createFischAsync } from './fischSlice';
import React, { useEffect } from 'react';
import { aquariumSelectors, fetchAquarienAsync } from '../aquarium/aquariumSlice';

import { yupResolver } from "@hookform/resolvers/yup";
import Werte from "./Werte";
import Allgemein from "./Allgemein";
import schema from "./fischValidationSchema";

const NeuerFischForm = () => {
  const dispatch = useAppDispatch();
  const {control, handleSubmit, reset} = useForm<FischFormValues>({resolver: yupResolver(schema)});
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, []);

  const onSubmit = (data: FischFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    data.kh.einheit = '°dH';
    data.gh.einheit = '°dH';
    data.ph.einheit = '';
    data.temperatur.einheit = '°C';
    dispatch(createFischAsync(data));
    reset({});
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{
          p: 2
        }}>
          <Typography variant='h5'>Neuer Fisch</Typography>
          <Divider orientation='horizontal'/>
          <br/>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Allgemein control={control} aquarien={aquarien}/>
            </Grid>
            <Grid item xs={12}>
              <Divider orientation='horizontal'/>
            </Grid>
            <Grid item xs={12}>
              <Werte control={control}/>
            </Grid>
          </Grid>
          <br/>
          <br/>
          <Button variant='contained' type='submit'>Senden</Button>
        </Card>
      </form>
    </>
  );
};
export default NeuerFischForm;