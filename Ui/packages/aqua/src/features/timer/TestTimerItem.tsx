import { Box, Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import { useAppDispatch } from "../../store/store";
import { incrementSecond, pauseTimer, removeTimer, resetTimer, setTime, startTimer, Timer } from "./timerSlice";
import {
  TextInputComponent,
  TimerItemValues
} from 'shared-types';
import DaTextInput from 'ts-control/DaTextInput';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import * as Tone from 'tone'

const AppTextInput = DaTextInput as TextInputComponent;
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  timer: Timer;
}

const TestTimerItem = ({timer}: Props) => {
  const dispatch = useAppDispatch();
  const {control, reset, handleSubmit} = useForm<TimerItemValues>();

  useEffect(() => {
    console.log('Use timer Effect');
    if (timer.seconds && !timer.active) {
      reset({
        minuten: Math.floor(timer.seconds / 60).toString(),
        sekunden: Math.floor(timer.seconds % 60).toString()
      });
    }
    let interval: NodeJS.Timer | null = null;
    if (timer.active) {
      interval = setInterval(() => {
        dispatch(incrementSecond(timer.name));
      }, 1000);
    } else if (!timer.active && timer.seconds === 0) {
      clearInterval(interval!);
      dispatch(resetTimer(timer.name));
    }
    if (timer.ringActive) {
      playSound();
    }
    return () => clearInterval(interval!);
  }, [timer])

  const displayTime = (seconds: number) => {
    const sek = Math.floor(seconds % 60);
    const min = Math.floor(seconds / 60);
    return `${String(min).padStart(2, '0')}${sek % 2 === 0 ? ':' : ' '}${String(sek).padStart(2, '0')}`;
  }

  const handleStopTimer = () => {
    dispatch(pauseTimer(timer.name));
  }

  const playSound = () => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now()
    synth.triggerAttack("D4", now);
    synth.triggerAttack("F4", now + 0.2);
    synth.triggerAttack("A4", now + 0.4);
    synth.triggerAttack("C5", now + 0.6);
    synth.triggerAttack("E5", now + 0.8);
    synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 1.2);
  }

  const handleDeleteTimer = () => {
    dispatch(removeTimer(timer.name));
  }

  const start = (data: TimerItemValues) => {
    const {minuten, sekunden} = data;
    const sek = parseInt(sekunden);
    const min = parseInt(minuten);
    const gesamt = (isNaN(sek) ? 0 : sek) + 60 * (isNaN(min) ? 0 : min);
    dispatch(setTime({seconds: gesamt, name: timer.name}));
    dispatch(startTimer(timer.name));
  }

  return (<Paper sx={{
    p: 2,
    mt: 2,
  }}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <Typography variant='h5'>{timer.name}</Typography>
      <Typography
        sx={{fontFamily: 'monospace'}}
        color='text.secondary'
        variant='h5'>{displayTime(timer.current)}</Typography>
    </Box>
    <Divider orientation='horizontal'/>

    <form onSubmit={handleSubmit(start)}>
      <AppTextInput disabled={timer.active} min={0} max={60} default='' control={control} name='minuten' label='Minuten'
                    type='number'/>
      <AppTextInput disabled={timer.active} min={0} max={59} default='' control={control} name='sekunden'
                    label='Sekunden' type='number'/>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Box>
          <IconButton disabled={timer.active} color='primary' type='submit'><PlayArrowIcon/></IconButton>
          <IconButton disabled={!timer.active} color='warning'
                      onClick={() => handleStopTimer()}><StopIcon/></IconButton>
        </Box>
        <Box>
          <IconButton color='error' onClick={() => handleDeleteTimer()}><DeleteIcon/></IconButton>
        </Box>
      </Box>
    </form>
  </Paper>);
};

export default TestTimerItem;
