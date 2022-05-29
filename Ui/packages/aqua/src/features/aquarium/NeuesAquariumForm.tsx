import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Card,
  Divider,
  Typography
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  AquariumFormValues,
} from 'shared-types';

import { useAppDispatch } from '../../store/store';
import { createAquariumAsync } from './aquariumSlice';

import Allgemein from "./Allgemein";
import schema from "./aquariumValidationSchema";

const NeuesAquariumForm = () => {
  const dispatch = useAppDispatch();
  const {control, handleSubmit, reset} = useForm<AquariumFormValues>({resolver: yupResolver(schema)});

  const onSubmit = (data: AquariumFormValues) => {
    dispatch(createAquariumAsync(data));
    reset({});
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{padding: '2rem'}}>
          <Typography variant='h5'>Neues Aquarium</Typography>
          <Divider orientation='horizontal'/>
          <br/>
          <Allgemein control={control}/>
          <br/>
          <br/>
          <Button variant='contained' type='submit'>Senden</Button>
        </Card>
      </form>
    </>
  );
};

export default NeuesAquariumForm;
