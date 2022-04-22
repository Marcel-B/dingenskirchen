export type AppLink = {
  name: string;
  target: string;
};

export type SelectOption = {
  text: string;
  value: string | number;
}

export type MessungFormValues = {
  wert: number | null;
  datum: Date;
  typ: number | null;
  aquarium: string;
}

export type AquariumFormValues = {
  name: number | null;
  liter: Date;
}

export type Messung = {
  id: string;
  wert: number;
  datum: Date;
  typ: number;
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