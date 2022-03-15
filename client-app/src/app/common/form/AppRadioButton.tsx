import { useController, UseControllerProps } from 'react-hook-form';
import { FormControlLabel, Radio } from '@mui/material';

interface Props extends UseControllerProps {
  label: string;
  value: number;
}

export const AppRadioButton = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: false });
  return (
    <FormControlLabel control={
      <Radio{...field} />}
                      value={props.value}
                      checked={field.value}
                      label={props.label} />
  );
};