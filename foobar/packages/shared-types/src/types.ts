export type AppLink = {
  name: string;
  target: string;
};

export type SelectOption = {
  text: string;
  value: string | number;
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
export type SelectComponent = React.FunctionComponent<{ control: any, label: string, values: SelectOption[], name: string, defaultValue: number | string | null }>;
export type TextInputComponent = React.FunctionComponent<{ control: any, label: string, multiline?: boolean, rows?: number, default: string | number | null, type: string, name: string }>;
export type DatePickerComponent = React.FunctionComponent<{ control: any, label: string, name: string, default: Date }>;