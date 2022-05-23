import { Box, Button, Divider, Fade, Modal, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createNotizAsync, resetNotiz } from "./notizSlice";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Allgemein from "./Allgemein";
import { useForm } from "react-hook-form";
import { NotizFormValues } from "shared-types";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./notizValidationSchema";
import { aquariumSelectors, fetchAquarienAsync } from "../aquarium/aquariumSlice";
import { useEffect } from "react";
import { fetchFeedAsync } from "../feed/feedSlice";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { notiz } from "./notizStyle";
import { showSuccessMessage } from "../../store/commonSlice";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '6px solid',
  borderColor: notiz,
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const NotizDialog = () => {
  const dispatch = useAppDispatch();
  const {addNotiz} = useAppSelector(state => state.notizen);
  const {control, handleSubmit, reset} = useForm<NotizFormValues>({resolver: yupResolver(schema)});
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, []);

  const handleClose = () => {
  }

  const onSubmit = (data: NotizFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    dispatch(createNotizAsync(data));
    reset({datum: new Date()});
    dispatch(resetNotiz());
    dispatch(fetchFeedAsync());
    dispatch(showSuccessMessage('Notiz gespeichert'));
  };

  return (
    <Modal
      open={addNotiz}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={addNotiz}>
        <Box sx={style}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h4'>Neue Notiz</Typography>
            <StickyNote2Icon sx={{pt: 1, color: notiz}}/>
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
                onClick={() => dispatch(resetNotiz())}
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

export default NotizDialog;