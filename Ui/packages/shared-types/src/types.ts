export interface Entity {
  userId: string;
}

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

export interface MessungFormValues extends Entity {
  id?: string;
  menge: number | null;
  datum: Date;
  wert: string | null;
  aquarium: Aquarium;
}

export interface Messung extends Entity {
  id: string;
  menge: number;
  datum: Date;
  wert: string;
  aquarium: Aquarium;
}

export interface DuengungFormValues extends Entity {
  id?: string;
  menge: number | null;
  datum: Date;
  duenger: string | null;
  aquarium: Aquarium;
}

export interface Duengung extends Entity {
  id: string;
  menge: number;
  datum: Date;
  duenger: string;
  aquarium: Aquarium;
}

export type Bereich = {
  von: number;
  bis: number;
  einheit: string;
}

export interface Fisch extends Entity {
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
  aquarium: Aquarium;
}

export interface FischFormValues extends Entity {
  id?: string;
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
  aquarium: Aquarium;
}

export type AquariumFormValues = {
  id?: string;
  name: string | null;
  liter: number | undefined;
}

export type Tag = {
  id: string;
  value: string;
}

export type Feed = {
  total: number;
  groupedFeeds: GroupedFeed[];
}

export type TimerItemValues = {
  name: string;
  minuten: string;
  sekunden: string;
}

export type GroupedFeed = {
  datum: Date;
  feedItems: FeedItem[];
}

export type FeedItem = {
  id: string;
  aquaType: string;
  item: Aquarium | Notiz | Messung | Duengung | Fisch
}

export interface Notiz extends Entity{
  id: string;
  text: string;
  datum: Date;
  tag: string;
  aquarium: Aquarium;
}

export interface NotizFormValues extends Entity{
  id?: string;
  text: string | undefined;
  datum: Date;
  tag: string | undefined;
  aquarium: Aquarium;
}

export interface Aquarium extends Entity {
  id: string;
  name: string;
  liter: number;
  datum: Date;
}

export type User = {
  username: string;
  displayName: string;
  token: string;
  image?: string;
}

export type UserFormValues = {
  id?: string;
  email: string;
  password: string;
  password2: string;
  displayName?: string;
  username?: string;
}

export type HeaderComponent = React.FunctionComponent<{ appLinks: AppLink[] }>;
export type NeueMessungComponent = React.FunctionComponent;
export type AquaListeComponent = React.FunctionComponent;
export type CheckboxComponent = React.FunctionComponent<{ control: any, label: string }>;
export type RadioButtonComponent = React.FunctionComponent<{ control: any, label: string, values: SelectOption[], name: string, defaultValue: number | string | null }>;
export type SelectComponent = React.FunctionComponent<{ control: any, label: string, values: SelectOption[], name: string, defaultValue: number | string | null }>;
export type TextInputComponent = React.FunctionComponent<{ control: any, placeholder?: string, min?: number, max?: number, disabled?: boolean, label: string, multiline?: boolean, rows?: number, default: string | number | null, type: string, name: string }>;
export type DatePickerComponent = React.FunctionComponent<{ control: any, label: string, name: string, default: Date }>;