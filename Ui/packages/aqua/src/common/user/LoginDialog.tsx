import { useAppDispatch, useAppSelector } from "../../store/store";
import { useForm } from "react-hook-form";
import { UserFormValues } from "shared-types";
import { showSuccessMessage } from "../commonSlice";
import { Box, Button, Divider, Fade, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { loginUserAsync, registerUserAsync, setLoginUser, setRegisterUser } from "./userSlice";
import LoginForm from "./LoginForm";
import { fetchFeedAsync } from "../../features/feed/feedSlice";
import LoginIcon from '@mui/icons-material/Login';
import { login } from "./loginStyle";
import RegisterForm from "./RegisterForm";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { registerSchema, loginSchema } from "./userValidationSchema";
import { fetchAquarienAsync } from "../../features/aquarium/aquariumSlice";
import React from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '6px solid',
  borderColor: login,
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const LoginDialog = () => {
  const dispatch = useAppDispatch();
  const {loginUser, registerUser} = useAppSelector(state => state.user);
  const {
    control,
    handleSubmit,
    reset
  } = useForm<UserFormValues>({resolver: yupResolver(registerUser ? registerSchema : loginSchema)});

  const handleClose = () => {
  }

  const onSubmit = (data: UserFormValues) => {
    if (registerUser) {
      const result = dispatch(registerUserAsync(data));
      result.then(_ => {
        dispatch(fetchFeedAsync());
        dispatch(fetchAquarienAsync());
      });
      dispatch(setRegisterUser(false));
      dispatch(showSuccessMessage('Benutzer angelegt'));
    } else {
      const result = dispatch(loginUserAsync(data));
      result.then(_ => {
        dispatch(fetchFeedAsync());
        dispatch(fetchAquarienAsync());
      });
      dispatch(setLoginUser(false));
      dispatch(showSuccessMessage('Benutzer angemeldet'));
    }
    reset();
  }

  return (
    <Modal
      open={loginUser || registerUser}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={loginUser || registerUser}>
        <Box sx={style}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h4'>{registerUser ? 'Registrieren' : 'Login'}</Typography>
            <LoginIcon sx={{pt: 1, color: login}}/>
          </Box>
          <Divider orientation='horizontal' sx={{
            mb: 1
          }}/>
          <form onSubmit={handleSubmit(onSubmit)}>
            {registerUser ?
              <RegisterForm control={control}/> : <>
                <LoginForm control={control}/>
                <Button onClick={() => dispatch(setRegisterUser(true))}>Neu registrieren</Button>
              </>
            }
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <Button
                variant='outlined'
                onClick={() => dispatch(setLoginUser(false))}
                color='secondary'
                size='large'
                endIcon={<CloseIcon/>}>
                Schließen
              </Button>
              <Button
                variant='outlined'
                type='submit'
                endIcon={<LoginIcon/>}
                color='primary'
                size='large'>
                {registerUser ? 'Registrieren' : 'Einloggen'}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

export default LoginDialog;