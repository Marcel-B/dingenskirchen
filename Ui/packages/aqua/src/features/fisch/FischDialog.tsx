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
import { FischFormValues } from "shared-types";
import { fisch } from "./fischStyle";
import schema from "./fischValidationSchema";
import { createFischAsync, resetFisch } from "./fischSlice";
import SetMealIcon from '@mui/icons-material/SetMeal';
import Werte from "./Werte";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '6px solid',
  borderColor: fisch,
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const FischDialog = () => {
  const dispatch = useAppDispatch();
  const {addFisch} = useAppSelector(state => state.fische);
  const {control, handleSubmit, reset} = useForm<FischFormValues>({resolver: yupResolver(schema)});
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, []);

  const handleClose = () => {
  }

  const onSubmit = (data: FischFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    dispatch(createFischAsync(data));
    reset({datum: new Date()});
    dispatch(resetFisch());
    dispatch(fetchFeedAsync());
    dispatch(showSuccessMessage('Fisch gespeichert'));
  };

  return (
    <Modal
      open={addFisch}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={addFisch}>
        <Box sx={style}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h4'>Neuer Fisch</Typography>
            <SetMealIcon sx={{pt: 1, color: fisch}}/>
          </Box>
          <Divider orientation='horizontal' sx={{
            mb: 1
          }}/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{
              display: "flex"
            }}>
              <Box>
                <Allgemein control={control} aquarien={aquarien}/>
              </Box>
              <Box>
                <Divider orientation='vertical' sx={{
                  m: 1
                }}/>
              </Box>
              <Box>
                <Werte control={control}/>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <Button
                variant='outlined'
                onClick={() => dispatch(resetFisch())}
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

export default FischDialog;
