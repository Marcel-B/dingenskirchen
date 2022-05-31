import { Box, Button, ButtonGroup, Divider, Paper, Typography } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import TimerItem from "./TimerItem";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useForm } from "react-hook-form";
import { addTestTimer, addTimer } from "./timerSlice";
import {
  TextInputComponent,
} from 'shared-types';
import DaTextInput from 'ts-control/DaTextInput';
import TestType, { testTimerTypes } from "../../models/testType";

const AppTextInput = DaTextInput as TextInputComponent;

const TimerControl = () => {
  const dispatch = useAppDispatch();
  const {timer} = useAppSelector(state => state.timer);

  const {handleSubmit, control, reset} = useForm<{ name: string }>();
  const handleAddTimer = (data: { name: string }) => {
    dispatch(addTimer(data.name));
    reset();
  }

  const handleAddTypeTimer = (type: TestType) => {
    const t = testTimerTypes.find(ttt => ttt.type === type);
    if (t) {
      dispatch(addTestTimer({name: t.text, testType: type, seconds: t.seconds}));
    }
  }

  return (
    <>
      <Box sx={{
        mt: 2,
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h4'
                    sx={{
                      mt: 1
                    }}>Timer</Typography>
        <TimerIcon fontSize='medium' color='disabled'/>
      </Box>
      <Divider orientation='horizontal'/>
      <Paper sx={{p: 2, mt: 2}}>
        <Box sx={{display: 'flex', justifyContent: 'space-around', pb: 2}}>
          <ButtonGroup
            size='small'
            variant="outlined"
            aria-label="outlined button group">
            <Button onClick={() => handleAddTypeTimer(TestType.PO4)}>PO₄</Button>
            <Button onClick={() => handleAddTypeTimer(TestType.NO2)}>NO₂</Button>
            <Button onClick={() => handleAddTypeTimer(TestType.NH4)}>NH₄</Button>
            <Button onClick={() => handleAddTypeTimer(TestType.FE)}>FE</Button>
            <Button onClick={() => handleAddTypeTimer(TestType.NO3)}>NO₃</Button>
            <Button onClick={() => handleAddTypeTimer(TestType.PH)}>PH</Button>
            <Button onClick={() => handleAddTypeTimer(TestType.K)}>K</Button>
          </ButtonGroup>
        </Box>
        <form onSubmit={handleSubmit(handleAddTimer)}>
          <AppTextInput control={control} label='Name' name='name' type='text' default=''/>
          <Button type='submit'>Neuer Timer</Button>
        </form>
      </Paper>
      {timer.map(t =>
        <TimerItem timer={t} key={t.name}/>
      )}
    </>
  );
}

export default TimerControl;