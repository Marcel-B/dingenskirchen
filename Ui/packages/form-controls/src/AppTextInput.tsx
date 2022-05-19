import { TextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  multiline?: boolean;
  rows?: number;
  default?: string | number | null;
  type?: string;
}

const AppTextInput = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: props.default });
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
};

export default AppTextInput;