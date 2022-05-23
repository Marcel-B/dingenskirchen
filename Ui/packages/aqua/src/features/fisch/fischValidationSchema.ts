import * as yup from "yup";

const schema = yup.object({
    name: yup
        .string()
        .required('benötigt'),
    wissenschaftlich: yup
        .string()
        .required('benötigt'),
    herkunft: yup
        .string()
        .required('benötigt'),
    schwimmzone: yup
        .string()
        .required('benötigt'),
    anzahl: yup
        .number()
        .typeError('muss eine Zahl sein')
        .positive('muss positiv sein')
        .integer('muss eine natürliche Zahl sein')
        .required('benötigt'),
}).required();

export default schema;