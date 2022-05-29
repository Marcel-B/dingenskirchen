import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .required('benötigt'),
  displayName: yup
    .string()
    .required('benötigt'),
  email: yup
    .string()
    .email('email')
    .required('benötigt'),
  password: yup
    .string()
    .required('benötigt'),
  password2: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwörter ungleich')
    .required('benötigt')
}).required();


export const loginSchema = yup.object({
  email: yup
    .string()
    .email('email')
    .required('benötigt'),
  password: yup
    .string()
    .required('benötigt'),
}).required();
