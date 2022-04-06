import React from 'react';
import { Box, List, ListItem } from '@mui/material';

interface Props {
  errors: any;
}

const ValidationErrors = ({ errors }: Props) => {
  return (
    <Box >
      {errors && (
        <List>
          {errors.map((err: any, i: any) => (
            <ListItem key={i}>{err}</ListItem>
          ))}
        </List>
      )}

    </Box>
  );

};

export default ValidationErrors;