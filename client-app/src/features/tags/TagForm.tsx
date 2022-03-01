import { Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button } from 'semantic-ui-react';
import TagList from './TagList';

const TagForm = () => {
  return (
    <>
      <TagList />
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={values => console.log(values)}>
        {({ handleSubmit }) => (
          <Form
            className='ui form'
            onSubmit={handleSubmit}>
            <MyTextInput placeholder='Name' name='name' />
            <Button
              positive
              content='Speichern'
              fluid />
          </Form>
        )}

      </Formik>
    </>
  );
};

export default TagForm;