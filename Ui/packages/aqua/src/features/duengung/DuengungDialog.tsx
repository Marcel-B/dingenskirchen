import { useAppDispatch, useAppSelector } from "../../store/store";
import { useForm } from "react-hook-form";
import { DuengungFormValues } from "shared-types";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { aquariumSelectors, fetchAquarienAsync } from "../aquarium/aquariumSlice";
import React, { useEffect } from "react";
import { Box, Button, Divider, Fade, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import ScienceIcon from '@mui/icons-material/Science';
import { duenger } from "./duengungStyle";
import { createDuengungAsync, duengungenSelectors, resetDuengung, updateDuengungAsync } from "./duengungSlice";
import schema from "./duengungValidationSchema";
import Allgemein from "./Allgemein";
import { fetchFeedAsync } from "../feed/feedSlice";
import { showSuccessMessage } from "../../common/commonSlice";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '6px solid',
  borderColor: duenger,
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const DuengungDialog = () => {
  const dispatch = useAppDispatch();
  const {addDuengung, updateDuengung, duengungId} = useAppSelector(state => state.duengungen);
  const duengung = useAppSelector(state => duengungenSelectors.selectById(state, duengungId));
  const {control, handleSubmit, reset} = useForm<DuengungFormValues>({resolver: yupResolver(schema)});
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
    if (duengung) {
      reset({
        aquarium: duengung.aquarium,
        duenger: duengung.duenger,
        datum: duengung.datum,
        menge: duengung.menge
      });
    }
  }, [duengung]);

  const handleClose = () => {
  }

  const onSubmit = (data: DuengungFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    if (updateDuengung) {
      data.id = duengungId;
      dispatch(updateDuengungAsync(data))
        .then(_ => dispatch(fetchFeedAsync()));
      dispatch(showSuccessMessage('Düngung geändert'));
    } else {
      dispatch(createDuengungAsync(data))
        .then(_ =>
          dispatch(fetchFeedAsync()));
      dispatch(showSuccessMessage('Düngung gespeichert'));
    }
    reset({datum: new Date()});
    dispatch(resetDuengung());
  }

  return (
    <Modal
      open={addDuengung || updateDuengung}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={addDuengung || updateDuengung}>
        <Box sx={style}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h4'>{updateDuengung ? 'Düngung ändern' : 'Neue Düngung'}</Typography>
            <ScienceIcon sx={{pt: 1, color: duenger}}/>
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
                onClick={() => dispatch(resetDuengung())}
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
}

export default DuengungDialog;