import * as yup from "yup";
import duengungTypeOptions from "../../models/duengungTyp";

const schema = yup.object({
  duenger: yup
    .mixed()
    .oneOf(duengungTypeOptions.map(i => i.value.toString()))
    .defined('benötigt'),
  aquarium: yup
    .string()
    .required('benötigt'),
  datum: yup
    .date()
    .typeError('benötigt')
    .required('benötigt'),
  menge: yup
    .number()
    .typeError('muss eine Zahl sein')
    .positive('muss positiv sein')
    .required('benötigt')
}).required();

export default schema;