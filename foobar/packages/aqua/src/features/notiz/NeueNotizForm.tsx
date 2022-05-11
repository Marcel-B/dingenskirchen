import { DatePickerComponent, NotizFormValues, SelectComponent, TextInputComponent } from 'shared-types';
import DaDatePicker from 'ts-control/DaDatePicker';
import DaTextInput from 'ts-control/DaTextInput';
import DaSelect from 'ts-control/DaSelect';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useForm } from 'react-hook-form';
import { aquariumSelectors, fetchAquarienAsync } from '../../store/aquariumSlice';
import { useEffect } from 'react';
import { createNotizAsync } from '../../store/notizSlice';
import { Button, Card, Divider, Typography } from '@mui/material';

const AppDatePicker = DaDatePicker as DatePickerComponent;
const AppTextInput = DaTextInput as TextInputComponent;
const AppSelect = DaSelect as SelectComponent;

const NeueNotizForm = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<NotizFormValues>();
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, []);

  const onSubmit = (data: NotizFormValues) => {
    const aqua = aquarien.find(a => a.id === data.aquarium.toString());
    data.aquarium = aqua!;
    dispatch(createNotizAsync(data));
    reset({ datum: new Date() });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={{ padding: '2rem' }}>
          <Typography variant='h5'>Neue Notiz</Typography>
          <Divider orientation='horizontal' />
          <br />
          <AppDatePicker control={control} default={new Date()} label='Datum' name='datum' />
          <AppSelect
            name='aquarium'
            defaultValue={null}
            control={control}
            label='Aquarium'
            values={aquarien.map(aquarium => {
              return {
                text: aquarium.name,
                value: aquarium.id,
              };
            })} />
          <AppTextInput control={control} label='Text' type='text' default='' name='text' />
          <AppTextInput control={control} label='Tag' type='text' default='' name='tag' />
          <br />
          <br />
          <Button variant='contained' type='submit'>Senden</Button>
        </Card>
      </form>
    </>
  );


};

export default NeueNotizForm;