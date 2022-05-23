import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createMessungAsync } from './messungSlice';
import { aquariumSelectors, fetchAquarienAsync } from '../aquarium/aquariumSlice';
import { MessungFormValues } from "shared-types";
import Allgemein from "./Allgemein";

const NeueMessungForm = () => {
  const dispatch = useAppDispatch();
  const aquarien = useAppSelector(aquariumSelectors.selectAll);
  const {control, handleSubmit, reset} = useForm<MessungFormValues>();

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, [dispatch]);

  const onSubmit = (data: MessungFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    dispatch(createMessungAsync(data));
    reset({datum: new Date()});
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{padding: '2rem'}}>
          <Typography variant='h5'>Neue Messung</Typography>
          <Divider
            orientation='horizontal'
            sx={{
              mb: 1
            }}/>
          <Box sx={{
            mb: 2
          }}>
            <Allgemein control={control} aquarien={aquarien}/>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Button variant='contained' type='submit'>Senden</Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default NeueMessungForm;
