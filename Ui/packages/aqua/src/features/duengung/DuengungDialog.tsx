import { useAppDispatch, useAppSelector } from "../../store/store";
import { useForm } from "react-hook-form";
import { DuengungFormValues } from "shared-types";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { aquariumSelectors, fetchAquarienAsync } from "../aquarium/aquariumSlice";
import { useEffect } from "react";
import { Box, Button, Divider, Fade, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import ScienceIcon from '@mui/icons-material/Science';
import { duenger } from "./duengungStyle";
import { addDuengung, createDuengungAsync, resetDuengung } from "./duengungSlice";
import schema from "./duengungValidationSchema";
import Allgemein from "./Allgemein";
import { fetchFeedAsync } from "../feed/feedSlice";
import { showSuccessMessage } from "../../store/commonSlice";

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
  const {addDuengung} = useAppSelector(state => state.duengungen);
  const {control, handleSubmit, reset} = useForm<DuengungFormValues>({resolver: yupResolver(schema)});
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, []);

  const handleClose = () => {
  }

  const onSubmit = (data: DuengungFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    dispatch(createDuengungAsync(data));
    reset({datum: new Date()});
    dispatch(resetDuengung());
    dispatch(fetchFeedAsync());
    dispatch(showSuccessMessage('Düngung gespeichert'));
  }

  return (
    <Modal
      open={addDuengung}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={addDuengung}>
        <Box sx={style}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h4'>Neue Düngung</Typography>
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