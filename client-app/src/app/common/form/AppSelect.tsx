import { useController, UseControllerProps } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectOption } from '../options/categoryOptions';


interface Props extends UseControllerProps {
  label: string;
  values: SelectOption[];
}

const AppSelect = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <FormControl fullWidth margin={'dense'}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        onChange={field.onChange}
        value={field.value}>
        {props.values.map(value =>
          <MenuItem key={value.value} value={value.value}>{value.text}</MenuItem>)}</Select>
    </FormControl>
  );
};

export default AppSelect;