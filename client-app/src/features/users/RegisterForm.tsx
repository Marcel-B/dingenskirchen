import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { UserFormValues } from '../../app/models/user';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '../../app/stores/store';

const schema = yup.object({
  displayName: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
    resolver: yupResolver(schema),
  });
  const { userStore } = useStore();
  const navigate = useNavigate();

  const onSubmit = (data: UserFormValues) => {
    userStore
      .register(data)
      .then(() => navigate('/app/buchungen'));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete={'off'}>
      <h2>
        Registrieren Haushaltsbuch
      </h2>
      <TextField
        label='Anzeigename'
        fullWidth
        {...register('displayName')}
        variant={'outlined'}
        type={'text'}
        margin={'dense'}
        error={!!errors.displayName}
        helperText={errors?.displayName}
        name={'displayName'} />
      <TextField
        label='Benutzername'
        fullWidth
        {...register('username')}
        variant={'outlined'}
        type={'text'}
        margin={'dense'}
        error={!!errors.username}
        helperText={errors?.username}
        name={'username'} />
      <TextField
        label='Email'
        fullWidth
        {...register('email')}
        variant={'outlined'}
        type={'email'}
        margin={'dense'}
        error={!!errors.email}
        helperText={errors?.email}
        name={'email'} />
      <TextField
        label='Passwort'
        fullWidth
        {...register('password')}
        variant={'outlined'}
        type={'password'}
        margin={'dense'}
        error={!!errors.password}
        helperText={errors?.password}
        name={'password'} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          style={{ marginTop: '1rem' }}
          type='submit'
          variant={'contained'}
        >Registrieren</Button>
      </div>
    </form>
  );
};

export default observer(RegisterForm);
