import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { UserFormValues } from '../../app/models/user';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
    resolver: yupResolver(schema),
  });
  const { userStore } = useStore();
  const navigate = useNavigate();

  const onSubmit = (data: UserFormValues) => {

    userStore
      .login(data)
      .then(() => navigate('/app/buchungen'));
    //.catch((error) => setErrors({ error: 'Invalid email or password' }))
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete={'off'}>
      <Typography variant={'h5'} component={'h2'}>Einloggen Haushaltsbuch</Typography>
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

export default observer(LoginForm);

