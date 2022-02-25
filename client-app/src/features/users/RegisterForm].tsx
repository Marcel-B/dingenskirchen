import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Header } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import ValidationErrors from '../activities/errors/ValidationErrors';

const RegisterForm = () => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .catch(error => setErrors({ error }))}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className={'ui form error'}
          onSubmit={handleSubmit}
          autoComplete={'off'}>
          <Header as={'h2'} content={'Registrieren Haushaltsbuch'} color={'teal'} textAlign={'center'} />
          <MyTextInput placeholder={'Anzeigename'} name={'displayName'} />
          <MyTextInput placeholder={'Benutzername'} name={'username'} />
          <MyTextInput placeholder={'Email'} name={'email'} />
          <MyTextInput placeholder={'Password'} name={'password'} type={'password'} />
          <ErrorMessage name={'error'}
                        render={() =>
                          <ValidationErrors errors={errors.error} />} />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting} positive content={'Registrieren'} type={'submit'} fluid />
        </Form>
      )}
    </Formik>
  );
};

export default observer(RegisterForm);
