import TagList from './TagList';
//import { v4 as uuid } from 'uuid';
import {Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {Tag} from "../../app/models/tag";
import {useForm, SubmitHandler} from 'react-hook-form';
import {useEffect} from "react";
import {LoadingButton} from "@mui/lab";

const TagForm = () => {
  const {register, handleSubmit, reset, formState: {isSubmitting, isSubmitSuccessful}} = useForm<Tag>();

  const onSubmit: SubmitHandler<Tag> = data => {
  //  createTag({name: data.name, id: uuid()})
  //    .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ name: '' });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Typography variant='h2'>Tags hinzufügen</Typography>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <TextField autoComplete='off' label='Name' {...register("name")}/>
          </CardContent>
          <CardActions>
            <LoadingButton
              sx={{mt: 2}}
              color="secondary"
              type='submit'
              loading={isSubmitting}
              loadingPosition="start"
              startIcon={<SaveIcon/>}
              variant="contained"
            >
              Save
            </LoadingButton>
          </CardActions>
        </form>
      </Card>
      <br/>
      <TagList/>
    </>
  );
};

export default TagForm;
