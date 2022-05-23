import * as yup from 'yup';

const schema = yup.object({
  text: yup.string().required('benötigt'),
  tag: yup.string().required('benötigt'),
  aquarium: yup.string().required('benötigt'),
  datum: yup.date().required('benötigt')

}).required();


export default schema;