import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Timer {
  name: string;
  seconds: number;
  ringActive: boolean;
  active: boolean;
}

interface TimerState {
  timer: Timer[];
}

interface TimerObject {
  name: string;
  seconds: number;
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    timer: []
  } as TimerState,
  reducers: {
    addTimer: (state, action: PayloadAction<string>) => {
      state.timer = [...state.timer, {name: action.payload, active: false, seconds: 0, ringActive: false}];
    },
    removeTimer: (state, action: PayloadAction<string>) => {
      state.timer = state.timer.filter(timer => timer.name !== action.payload);
    },
    setTime: (state, action: PayloadAction<TimerObject>) => {
      const timer = state.timer.find(timer => timer.name === action.payload.name);
      timer!.seconds = action.payload.seconds;
      state.timer = [...state.timer.filter(timer => timer.name !== action.payload.name), timer!]
        .sort((a, b) => a.seconds > b.seconds ? 1 : a.seconds === b.seconds ? 0 : -1);
    },
    startTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timer.find(timer => timer.name === action.payload);
      timer!.active = true;
      state.timer = [...state.timer.filter(timer => timer.name !== action.payload), timer!]
        .sort((a, b) => a.seconds > b.seconds ? 1 : a.seconds === b.seconds ? 0 : -1);
    },
    pauseTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timer.find(timer => timer.name === action.payload);
      timer!.active = false;
      state.timer = [...state.timer.filter(timer => timer.name !== action.payload), timer!]
        .sort((a, b) => a.seconds > b.seconds ? 1 : a.seconds === b.seconds ? 0 : -1);
    },
    incrementSecond: (state, action: PayloadAction<string>) => {
      const timer = state.timer.find(timer => timer.name === action.payload);
      timer!.seconds -= 1;
      if (timer!.seconds <= 0) {
        timer!.ringActive = true;
        timer!.active = false;
        timer!.seconds = 0;
      }
      state.timer = [...state.timer.filter(timer => timer.name !== action.payload), timer!]
        .sort((a, b) => a.seconds > b.seconds ? 1 : a.seconds === b.seconds ? 0 : -1);
    },
    resetTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timer.find(timer => timer.name === action.payload);
      timer!.active = false;
      timer!.active = false;
      timer!.ringActive = false;
      timer!.seconds = 0;
      state.timer = [...state.timer.filter(timer => timer.name !== action.payload), timer!]
        .sort((a, b) => a.seconds > b.seconds ? 1 : a.seconds === b.seconds ? 0 : -1);
    }
  }
});

export const {
  resetTimer,
  addTimer,
  removeTimer,
  setTime,
  incrementSecond,
  startTimer,
  pauseTimer,
} = timerSlice.actions;