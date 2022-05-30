import { Box, Button, Divider, Fade, Modal, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createNotizAsync, notizSelectors, resetNotiz, updateNotizAsync } from "./notizSlice";
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
import { notiz as notizColor } from "./notizStyle";
import { showSuccessMessage } from "../../common/commonSlice";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '6px solid',
  borderColor: notizColor,
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const NotizDialog = () => {
  const dispatch = useAppDispatch();
  const {addNotiz, updateNotiz, notizId} = useAppSelector(state => state.notizen);
  const notiz = useAppSelector(state => notizSelectors.selectById(state, notizId));
  const {control, handleSubmit, reset} = useForm<NotizFormValues>({resolver: yupResolver(schema)});
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
    if (notiz) {
      reset({
        text: notiz.text,
        tag: notiz.tag,
        datum: notiz.datum,
        aquarium: notiz.aquarium
      });
    }
  }, [updateNotiz, notizId]);

  const handleClose = () => {
  }

  const onSubmit = (data: NotizFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    if (updateNotiz) {
      data.id = notizId;
      dispatch(updateNotizAsync(data))
        .then(_ => dispatch(fetchFeedAsync()));
      dispatch(showSuccessMessage('Notiz geändert'));
    } else {
      dispatch(createNotizAsync(data))
        .then(_ => dispatch(fetchFeedAsync()));
      dispatch(showSuccessMessage('Notiz gespeichert'));
    }
    reset({datum: new Date()});
  };

  return (
    <Modal
      open={addNotiz || updateNotiz}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={addNotiz || updateNotiz}>
        <Box sx={style}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h4'>{updateNotiz ? 'Notiz ändern' : 'Neue Notiz'}</Typography>
            <StickyNote2Icon sx={{pt: 1, color: notizColor}}/>
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