import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum TestType {
  Common,
  PO4,
  FE,
  NO3,
  NO2,
  NH4,
  PH,
  K,
}

export default TestType;

export interface TestTimer {
  text: string;
  type: TestType;
  description: string;
  seconds: number;
}

export const testTimerTypes: TestTimer[] = [
  {text: '', type: TestType.Common, description: '', seconds: 0},
  {text: 'NO₂', type: TestType.NO2, description: '5ml Wasser, 5 Tropfen 1, 5 Tropfen 2', seconds: 300},
  {text: 'NH₄', type: TestType.NH4, description: '5ml Wasser, 4 Tropfen 1, 4 Tropfen 2, 5 Tropfen 3', seconds: 60 * 15},
  {text: 'NO₃', type: TestType.NO3, description: '10ml Wasser, 1 großer Löffel 1, 6 Tropfen 2', seconds: 600},
  {text: 'PO₄', type: TestType.PO4, description: '10ml Wasser, 1 kleiner Löffel 1, 10 Tropfen 2', seconds: 600},
  {text: 'FE', type: TestType.FE, description: '5ml Wasser, 5 Tropfen 1', seconds: 600},
  {text: 'PH', type: TestType.PH, description: '5ml Wasser, 4 Tropfen 1', seconds: 180},
  {text: 'K', type: TestType.K, description: '15ml Wasser, 10 Tropfen 1, 1 großer Löffel 2', seconds: 60},
];

interface TestTimerState {
  timers: TestTimer[];
}
