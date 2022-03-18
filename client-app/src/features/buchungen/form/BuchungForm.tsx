import { useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { BuchungFormValues } from '../../../app/models/buchung';
//import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import { Box, Container, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AppDatePicker from '../../../app/common/form/AppDatePicker';
import AppTextInput from '../../../app/common/form/AppTextInput';
import { AppRadioButton } from '../../../app/common/form/AppRadioButton';
import AppSelect from '../../../app/common/form/AppSelect';
import { intervallOptions, kategorieOptions } from '../../../app/common/options/categoryOptions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/stores';
import { buchungenSelectors, fetchBuchungAsync } from '../../../app/stores/buchungenSlice';

const schema = yup.object({
  name: yup.string().required('Name ist ein Pflichtfeld'),
  betrag: yup.number().positive('Betrag muss positiv sein').required('Betrag ist ein Pflichtfeld'),
  zeitpunkt: yup.date().required('Zeitpunkt ist ein Pflichtfeld'),
  intervall: yup.number().required('Intervall ist ein Pflichtfeld'),
}).required();

const BuchungForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const buchung = useAppSelector(state => buchungenSelectors.selectById(state, id!));
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });
  //const navigate = useNavigate();

  /*
    const [buchung, setBuchung] = useState<BuchungFormValues>(new BuchungFormValues());
  */

  //const handleDelete = (id: string) => {
    /*
        if (id) {
          deleteBuchung(id)
            .then(() => navigate('/app/buchungen'))
            .catch((error) => console.log(error));
        }
    */
  //};

  useEffect(() => {
    console.log('Buchung', buchung);
    if (!buchung) {
      dispatch(fetchBuchungAsync(id!));
    }
  }, [id, dispatch, buchung]);

  const onSubmit = (data: BuchungFormValues) => {
    console.log('buchung form', data);
    /*
        if (buchung.id) {
          updateBuchung(buchung)
            .then(() => navigate('/app/buchungen'))
            .catch((error) => console.log(error));
        } else {*/
    /*
        let newBuchung = {
          ...data,
          id: uuid(),
        };
        createBuchung(newBuchung)
          .then(() => navigate('/app/buchungen'))
          .catch((error) => console.log(error));
    */
  };

  return (
    <Container component={Paper} maxWidth='sm' sx={{ p: 4 }}>
      <Typography variant={'h3'} component={'h1'}>Neue Buchung</Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(data => onSubmit(data as BuchungFormValues))}>
        <AppTextInput
          label='Name'
          type='text'
          control={control}
          name='name' />
        <AppTextInput
          label='Betrag'
          type='number'
          control={control}
          name='betrag' />
        <AppTextInput
          multiline
          rows={3}
          control={control}
          label={'Beschreibung'}
          name='beschreibung'
        />
        <AppDatePicker
          label={'Zeitpunkt'}
          control={control}
          name={'zeitpunkt'} />
        <AppSelect
          control={control}
          label={'Intervall'}
          values={intervallOptions}
          name={'intervall'} />
        <AppRadioButton
          values={kategorieOptions}
          label={'Kategorie'}
          control={control}
          name={'kategorie'} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <LoadingButton
            loading={isSubmitting}
            variant={'contained'}
            sx={{ bgcolor: 'warning.main' }}
            onClick={() => console.log('Delete triggered')}
          >Löschen</LoadingButton>
          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type='submit'
            style={{ marginLeft: '1rem' }}
            variant={'contained'}
          >Speichern</LoadingButton>
        </Box>
      </Box>
    </Container>
  )
    ;
};
export default BuchungForm;
