import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TestType from "../../models/testType";

export interface Timer {
  name: string;
  /**
   * Die eingestellten Zeitspanne des Timers
   */
  seconds: number;

  /**
   * Die laufende Zeit
   */
  current: number;
  ringActive: boolean;
  active: boolean;
  testType: TestType;
}

interface TimerState {
  timer: Timer[];
};

interface TimerObject {
  name: string;
  seconds: number;
  testType: TestType;
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    timer: []
  } as TimerState,
  reducers: {
    addTestTimer: (state, action: PayloadAction<TimerObject>) => {
      state.timer = [...state.timer, {
        name: action.payload.name,
        active: false,
        testType: action.payload.testType,
        seconds: action.payload.seconds,
        current: 0,
        ringActive: false
      }];
    },
    addTimer: (state, action: PayloadAction<string>) => {
      state.timer = [...state.timer, {
        name: action.payload,
        testType: TestType.Common,
        active: false,
        current: 0,
        seconds: 0,
        ringActive: false
      }];
    },
    removeTimer: (state, action: PayloadAction<string>) => {
      state.timer = state.timer.filter(timer => timer.name !== action.payload);
    },
    setTime: (state, action: PayloadAction<{ seconds: number, name: string }>) => {
      const timer = state.timer.find(timer => timer.name === action.payload.name);
      if (timer) {
        timer.seconds = action.payload.seconds;
        timer.current = action.payload.seconds;
        state.timer = [...state.timer.filter(timer => timer.name !== action.payload.name), timer]
          .sort((a, b) => a.current > b.current ? 1 : a.current === b.current ? 0 : -1);
      }
    },
    startTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timer.find(timer => timer.name === action.payload);
      if (timer) {
        timer.active = true;
        timer.ringActive = false;
        state.timer = [...state.timer.filter(timer => timer.name !== action.payload), timer]
          .sort((a, b) => a.current > b.current ? 1 : a.current === b.current ? 0 : -1);
      }
    },
    pauseTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timer.find(timer => timer.name === action.payload);
      if (timer) {
        timer.active = false;
        state.timer = [...state.timer.filter(timer => timer.name !== action.payload), timer]
          .sort((a, b) => a.current > b.current ? 1 : a.current === b.current ? 0 : -1);
      }
    },
    incrementSecond: (state, action: PayloadAction<string>) => {
      const timer = state.timer.find(timer => timer.name === action.payload);
      if (timer) {
        timer.current -= 1;
        if (timer.current <= 0) {
          timer.ringActive = true;
          timer.active = false;
          timer.current = 0;
        }
        state.timer = [...state.timer.filter(timer => timer.name !== action.payload), timer]
          .sort((a, b) => a.current > b.current ? 1 : a.current === b.current ? 0 : -1);

      }
    },
    resetTimer: (state, action: PayloadAction<string>) => {
      const timer = state.timer.find(timer => timer.name === action.payload);
      if (timer) {
        timer.active = false;
        timer.active = false;
        timer.ringActive = false;
        timer.seconds = 0;
        timer.current = 0;
        state.timer = [...state.timer.filter(timer => timer.name !== action.payload), timer]
          .sort((a, b) => a.current > b.current ? 1 : a.current === b.current ? 0 : -1);
      }
    }
  }
});

export const {
  resetTimer,
  addTimer,
  addTestTimer,
  removeTimer,
  setTime,
  incrementSecond,
  startTimer,
  pauseTimer,
} = timerSlice.actions;
