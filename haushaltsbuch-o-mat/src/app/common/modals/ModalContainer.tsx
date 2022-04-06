import { Box, Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../stores';
import { closeModal } from '../../stores/modalSlice';
import LoginForm from '../../../features/users/LoginForm';
import RegisterForm from '../../../features/users/RegisterForm';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalContainer = () => {
  const { open, body } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={open}
      onClose={() => dispatch(closeModal())}>
      <Box sx={style}>
        {body === 'loginForm' ? <LoginForm />
          : body === 'registerForm' ? <RegisterForm />
            : <></>}
      </Box>
    </Modal>
  );
};

export default ModalContainer;
