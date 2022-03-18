import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { UserFormValues } from '../../app/models/user';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch} from '../../app/stores';
import { loginAsync } from '../../app/stores/userSlice';
import { closeModal } from '../../app/stores/modalSlice';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: UserFormValues) => {
    dispatch(loginAsync({ userFormValue: data }));
    dispatch(closeModal());
    navigate('/app/buchungen');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete={'off'}>
      <Typography variant={'h5'} component={'h2'} sx={{ color: 'text.primary' }}>Einloggen Haushaltsbuch</Typography>
      <TextField
        label='Email'
        fullWidth
        {...register('email')}
        variant='outlined'
        type={'text'}
        margin={'dense'}
        error={!!errors.email}
        helperText={errors.email?.message}
        name={'email'} />
      <TextField
        fullWidth
        {...register('password')}
        label='Passwort'
        error={!!errors.password}
        variant='outlined'
        helperText={errors.password?.message}
        margin={'dense'}
        name={'password'}
        type={'password'}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          style={{ marginTop: '1rem' }}
          type='submit'
          variant={'contained'}
        >Einloggen</Button>
      </div>
    </form>
  );
};

export default LoginForm;
