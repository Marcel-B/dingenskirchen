import { TextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
import { BuchungFormValues } from '../../models/buchung';

interface Props extends UseControllerProps {
  label: string;
  multiline?: boolean;
  default?: string
  rows?: number;
  type?: string;
}

export default function AppTextInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });
  return (
    <TextField
      {...props}
      {...field}
      variant='outlined'
      fullWidth
      margin={'dense'}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      multiline={props.multiline}
      rows={props.rows}
      type={props.type}
    />
  );
}