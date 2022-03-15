import { useController, UseControllerProps } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SelectOption } from '../options/categoryOptions';


interface Props extends UseControllerProps {
  label: string;
  values: SelectOption[];
}

const AppSelect = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: 1 });
  return (
    <FormControl fullWidth margin={'dense'}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        onChange={(e: SelectChangeEvent) => {
          field.value = e.target.value;
        }}
        value={field.value}>{props.values.map(value =>
        <MenuItem key={value.value} value={value.value}>{value.text}</MenuItem>)}</Select>
    </FormControl>
  )
};

export default AppSelect;