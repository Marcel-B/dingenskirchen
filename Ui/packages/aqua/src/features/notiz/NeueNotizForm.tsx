import { useAppDispatch, useAppSelector } from '../../store/store';
import { useForm } from 'react-hook-form';
import { aquariumSelectors, fetchAquarienAsync } from '../aquarium/aquariumSlice';
import React, { useEffect } from 'react';
import { createNotizAsync } from './notizSlice';
import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { fetchTagsAsync, tagSelectors } from '../../store/tagSlice';
import { yupResolver } from "@hookform/resolvers/yup";
import { NotizFormValues } from "shared-types";
import Allgemein from "./Allgemein";
import schema from "./notizValidationSchema";


const NeueNotizForm = () => {
  const dispatch = useAppDispatch();
  const {control, handleSubmit, reset} = useForm<NotizFormValues>({resolver: yupResolver(schema)});
  const aquarien = useAppSelector(aquariumSelectors.selectAll);
  const tags = useAppSelector(tagSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
    dispatch(fetchTagsAsync());
  }, []);

  const onSubmit = (data: NotizFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    dispatch(createNotizAsync(data));
    reset({datum: new Date()});
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{padding: '2rem'}}>
          <Typography variant='h5'>Neue Notiz</Typography>
          <Divider orientation='horizontal' sx={{
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

export default NeueNotizForm;