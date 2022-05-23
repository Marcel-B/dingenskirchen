import * as yup from 'yup';

const schema = yup.object({
  wert: yup.string().required('benötigt'),
  menge: yup.number().typeError('nur Zahlen erlaubt').positive('nur positiv').required('benötigt'),
  aquarium: yup.string().required('benötigt'),
  datum: yup.date().required('benötigt')

}).required();

export default schema;
