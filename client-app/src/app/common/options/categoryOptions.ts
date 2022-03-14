export const kategorieOptions: SelectOption[] = [
  { text: 'Einnahme', value: 1 },
  { text: 'Ausgabe', value: 2 },
];
export interface SelectOption{
  text: string;
  value: number;
}
export const intervallOptions: SelectOption[] = [
  { text: 'Einmalig', value: 1 },
  { text: 'Monat', value: 2 },
  { text: 'Quartal', value: 3 },
  { text: 'Halbjahr', value: 4 },
  { text: 'Jahr', value: 5 },
];
