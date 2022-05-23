import { Box, Button, Divider, Fade, Modal, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Allgemein from "./Allgemein";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { aquariumSelectors, fetchAquarienAsync } from "../aquarium/aquariumSlice";
import { useEffect } from "react";
import { fetchFeedAsync } from "../feed/feedSlice";
import { showSuccessMessage } from "../../store/commonSlice";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { MessungFormValues } from "shared-types";
import schema from "./messungValidationSchema";
import { messung } from "./messungStyle";
import { createMessungAsync, resetMessung } from "./messungSlice";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '6px solid',
  borderColor: messung,
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const MessungDialog = () => {
  const dispatch = useAppDispatch();
  const {addMessung} = useAppSelector(state => state.messungen);
  const {control, handleSubmit, reset} = useForm<MessungFormValues>({resolver: yupResolver(schema)});
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, []);

  const handleClose = () => {
  }

  const onSubmit = (data: MessungFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    dispatch(createMessungAsync(data));
    reset({datum: new Date()});
    dispatch(resetMessung());
    dispatch(fetchFeedAsync());
    dispatch(showSuccessMessage('Messung gespeichert'));
  };

  return (
    <Modal
      open={addMessung}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={addMessung}>
        <Box sx={style}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h4'>Neue Messung</Typography>
            <DeviceThermostatIcon sx={{pt: 1, color: messung}}/>
          </Box>
          <Divider orientation='horizontal' sx={{
            mb: 1
          }}/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Allgemein control={control} aquarien={aquarien}/>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <Button
                variant='outlined'
                onClick={() => dispatch(resetMessung())}
                color='secondary'
                size='large'
                endIcon={<CloseIcon/>}>
                Schließen
              </Button>
              <Button
                variant='outlined'
                type='submit'
                endIcon={<SaveIcon/>}
                color='primary'
                size='large'>
                Speichern
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MessungDialog;
