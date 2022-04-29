export type AppLink = {
  name: string;
  target: string;
};

export type SelectOption = {
  text: string;
  value: string | number;
}

export interface ExtendedSelectOption extends SelectOption {
  unit: string;
}

export type MessungFormValues = {
  menge: number | null;
  datum: Date;
  wert: string | null;
  aquarium: string;
}

export type Messung = {
  id: string;
  menge: number;
  datum: Date;
  wert: string;
  aquarium: string;
}


export type DuengungFormValues = {
  menge: number | null;
  datum: Date;
  duenger: string | null;
  aquarium: string;
}

export type Duengung = {
  id: string;
  menge: number;
  datum: Date;
  duenger: string;
  aquarium: string;
}

export type Bereich = {
  von: number;
  bis: number;
  einheit: string;
}

export type Fisch = {
  id: string;
  name: string;
  wissenschaftlich: string;
  herkunft: string;
  ph: Bereich;
  gh: Bereich;
  kh: Bereich;
  temperatur: Bereich;
  schwimmzone: string;
  datum: Date;
  anzahl: number;
  geschlecht: string;
}

export type FischFormValues = {
  name: string;
  wissenschaftlich: string;
  herkunft: string;
  ph: Bereich;
  gh: Bereich;
  kh: Bereich;
  temperatur: Bereich;
  schwimmzone: string;
  datum: Date;
  anzahl: number;
  geschlecht: string;
}

// CO2 20-30 mg/l
// Nitrat (Stickstoff) 10-25 mgl/l
// Phosphat 0,1-1 mg/l
// Kalium 5-10 mg/l
// Magnesium  ?
// Eisen 0,05 - 0,1 mg/l

export type AquariumFormValues = {
  name: number | null;
  liter: Date;
}

export type Tag = {
  id: string;
  value: string;
}

export type Eintrag = {
  id: string;
  text: string;
  datum: Date;
  tag: string;
  aquarium: string;
}

export type Aquarium = {
  id: string;
  name: string;
  liter: number;
}

export type HeaderComponent = React.FunctionComponent<{ appLinks: AppLink[] }>;
export type NeueMessungComponent = React.FunctionComponent;
export type AquaListeComponent = React.FunctionComponent;
export type CheckboxComponent = React.FunctionComponent<{ control: any, label: string }>;
export type RadioButtonComponent = React.FunctionComponent<{ control: any, label: string, values: SelectOption[], name: string, defaultValue: number | string | null }>;
export type SelectComponent = React.FunctionComponent<{ control: any, label: string, values: SelectOption[], name: string, defaultValue: number | string | null }>;
export type TextInputComponent = React.FunctionComponent<{ control: any, label: string, multiline?: boolean, rows?: number, default: string | number | null, type: string, name: string }>;
export type DatePickerComponent = React.FunctionComponent<{ control: any, label: string, name: string, default: Date }>;