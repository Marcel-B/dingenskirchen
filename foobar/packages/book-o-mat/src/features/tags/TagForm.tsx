import TagList from './TagList';
import { useStore } from '../../app/stores/store';
import {Tag} from "../../app/models/tag";
import {useForm, SubmitHandler} from 'react-hook-form';
import {useEffect} from "react";

const TagForm = () => {
  const {tagStore: {createTag}} = useStore();
  const {register, handleSubmit, reset, formState: {isSubmitting, isSubmitSuccessful}} = useForm<Tag>();

  const onSubmit: SubmitHandler<Tag> = data => {
    // createTag({name: data.name, id: uuid()})
    //   .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ name: '' });
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      {/* <Typography variant='h2'>Tags hinzufügen</Typography>
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
      <TagList/> */}
    </>
  );
};

export default TagForm;
