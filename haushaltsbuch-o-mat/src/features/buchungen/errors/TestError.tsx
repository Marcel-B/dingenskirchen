import React, { useState } from 'react';

import ValidationErrors from './ValidationErrors';
import axios from 'axios';
import { Box, Button, ButtonGroup } from '@mui/material';

export default function TestErrors() {
  const baseUrl = 'http://localhost:5000/api/';
  const [errors, setErrors] = useState(null);

  function handleNotFound() {
    axios
      .get(baseUrl + 'buggy/not-found')
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios
      .get(baseUrl + 'buggy/bad-request')
      .catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios
      .get(baseUrl + 'buggy/server-error')
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    axios
      .get(baseUrl + 'buggy/unauthorised')
      .catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios
      .get(baseUrl + 'activities/notaguid')
      .catch((err) => console.log(err.response));
  }

  function handleValidationError() {
    axios.post(baseUrl + 'activities', {}).catch((err) => setErrors(err));
  }

  return (
    <>
      <h1>Test Error component</h1>
      <Box>
        <ButtonGroup variant={'contained'}>
          <Button onClick={handleNotFound}>Not Fount</Button>
          <Button
            onClick={handleBadRequest}
          >Bad Request</Button>
          <Button
            onClick={handleValidationError}
          >Validation Error</Button>
          <Button
            onClick={handleServerError}
          >Server Error</Button>
          <Button
            onClick={handleUnauthorised}
          >Unauthorized</Button>
          <Button onClick={handleBadGuid}>Bad Guid</Button>
        </ButtonGroup>
        {errors && <ValidationErrors errors={errors} />}
      </Box>
    </>
  );
}