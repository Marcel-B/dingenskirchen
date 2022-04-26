import { Divider, Stack } from '@mui/material';
import MessungListe from '../messung/MessungListe';
import NeueMessungForm from '../messung/NeueMessungForm';
import NeuesAquariumForm from '../aquarium/NeuesAquariumForm';
import AquariumListe from '../aquarium/AquariumListe';
import React from 'react';
import NeueDuengungForm from '../duengung/NeueDuengungForm';

const Dashboard = () => {
  return (
    <Stack direction='column' divider={<Divider orientation='horizontal' flexItem />} spacing={4}>
      <Stack direction='row' divider={<Divider orientation='vertical' flexItem />} spacing={4}>
        <MessungListe />
        <AquariumListe />
      </Stack>
      <Stack direction='row'>
        <Stack direction='row' divider={<Divider orientation='vertical' flexItem />} spacing={4}>
          <NeueMessungForm />
          <NeuesAquariumForm />
          <NeueDuengungForm />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;