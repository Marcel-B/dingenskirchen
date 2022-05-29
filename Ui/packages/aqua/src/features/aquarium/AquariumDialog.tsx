import { useAppDispatch, useAppSelector } from "../../store/store";
import { useForm } from "react-hook-form";
import { AquariumFormValues } from "shared-types";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import {
  aquariumSelectors,
  createAquariumAsync,
  fetchAquarienAsync,
  resetAquarium, updateAquariumAsync
} from "./aquariumSlice";
import { useEffect } from "react";
import { fetchFeedAsync } from "../feed/feedSlice";
import { showSuccessMessage } from "../../store/commonSlice";
import { Box, Button, Divider, Fade, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { aquarium } from "./aquariumStyle";
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import schema from "./aquariumValidationSchema";
import Allgemein from "./Allgemein";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '6px solid',
  borderColor: aquarium,
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const AquariumDialog = () => {
  const dispatch = useAppDispatch();
  const {addAquarium, editAquarium, aquariumId} = useAppSelector(state => state.aquarien);
  const aqua = useAppSelector(state => aquariumSelectors.selectById(state, aquariumId));
  const {control, handleSubmit, reset} = useForm<AquariumFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {name: aqua?.name ?? '', liter: aqua?.liter ?? undefined}
  });

  useEffect(() => {
    dispatch(fetchAquarienAsync());
    if (aqua) {
      reset({
        name: aqua.name,
        liter: aqua.liter
      })
    }
  }, [editAquarium, aquariumId]);

  const handleClose = () => {
  }

  const onSubmit = (data: AquariumFormValues) => {
    if (editAquarium) {
      data.id = aquariumId;
      dispatch(updateAquariumAsync(data));
      dispatch(showSuccessMessage('Aquarium geändert'));
    } else {
      dispatch(createAquariumAsync(data));
      dispatch(showSuccessMessage('Aquarium gespeichert'));
    }
    dispatch(resetAquarium());
    dispatch(fetchFeedAsync());
  }

  return (
    <Modal
      open={addAquarium || editAquarium}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={addAquarium || editAquarium}>
        <Box sx={style}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h4'>{editAquarium ? 'Aquarium ändern' : 'Neues Aquarium'}</Typography>
            <LocalDrinkIcon sx={{pt: 1, color: aquarium}}/>
          </Box>
          <Divider orientation='horizontal' sx={{
            mb: 1
          }}/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Allgemein control={control}/>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <Button
                variant='outlined'
                onClick={() => dispatch(resetAquarium())}
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

export default AquariumDialog;