import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { Box, Modal } from '@mui/material';

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
  const { modalStore } = useStore();

  return (
    <Modal
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}>
      <Box sx={style}>
        {modalStore.modal.body}
      </Box>
    </Modal>
  );
};

export default observer(ModalContainer);
