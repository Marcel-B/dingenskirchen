import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Box } from '@mui/material';

const ServerError = () => {
  const { commonStore } = useStore();

  return (
    <Box>
      <h1>Server Error</h1>
      <h5>{commonStore.error?.message}</h5>
      {commonStore.error?.details &&
        <>
          <h4>Stack trace</h4>
          <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
        </>
      }
    </Box>
  );
};

export default observer(ServerError);