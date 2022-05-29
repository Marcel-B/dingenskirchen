import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .required('benötigt'),
  liter: yup
    .number()
    .typeError('muss eine Zahl sein')
    .positive('muss positiv sein')
    .integer('muss eine natürliche Zahl sein')
    .required('benötigt')
}).required();

export default schema;