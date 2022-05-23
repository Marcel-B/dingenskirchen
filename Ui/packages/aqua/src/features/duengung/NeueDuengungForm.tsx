import {
  Box,
  Button,
  Card,
  Divider,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { aquariumSelectors, fetchAquarienAsync } from '../aquarium/aquariumSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createDuengungAsync } from './duengungSlice';
import * as yup from 'yup';
import duengungTypeOptions from "../../models/duengungTyp";
import { yupResolver } from "@hookform/resolvers/yup";
import { DuengungFormValues } from "shared-types";
import Allgemein from "./Allgemein";
import schema from "./duengungValidationSchema";

const NeueDuengungForm = () => {
  const dispatch = useAppDispatch();
  const {control, handleSubmit, reset} = useForm<DuengungFormValues>({resolver: yupResolver(schema)});
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, [dispatch]);

  const onSubmit = (data: DuengungFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    dispatch(createDuengungAsync(data));
    reset({datum: new Date()});
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{padding: '2rem'}}>
          <Typography variant='h5'>Neue Düngung</Typography>
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
            justifyContent: "flex-end"
          }}>
            <Button variant='contained' type='submit'>Senden</Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default NeueDuengungForm;