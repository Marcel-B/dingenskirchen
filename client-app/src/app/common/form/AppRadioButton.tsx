import { useController, UseControllerProps } from 'react-hook-form';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { SelectOption } from '../options/categoryOptions';

interface Props extends UseControllerProps {
  label: string;
  values: SelectOption[];
}

export const AppRadioButton = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '2' });
  return (
    <FormControl
      fullWidth
      margin={'dense'}>
      <Typography>{props.label}</Typography>
      <RadioGroup
        row
        value={field.value}
        onChange={field.onChange}
        name='row-radio-buttons-group'>
        {props.values.map(option =>
          <FormControlLabel control={<Radio />} label={option.text} key={option.value} value={option.value} />,
        )}
      </RadioGroup>
    </FormControl>
  );
};