import { useController, UseControllerProps } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectOption } from 'shared-types';

interface Props extends UseControllerProps {
  label: string;
  values: SelectOption[];
}

const AppSelect = (props: Props) => {
  const {field, fieldState} = useController({...props, defaultValue: props.defaultValue ?? ''});

  return (
    <FormControl fullWidth margin={'dense'}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        error={!!fieldState.error}
        onChange={field.onChange}
        value={field.value}>
        {props.values.map(value =>
          <MenuItem key={value.value} value={value.value}>{value.text}</MenuItem>)}</Select>
    </FormControl>
  );
};

export default AppSelect;