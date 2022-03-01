import { Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button } from 'semantic-ui-react';
import TagList from './TagList';
import { useStore } from '../../app/stores/store';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const TagForm = () => {
  const navigate = useNavigate();
  const { tagStore: { createTag } } = useStore();

  const submitTag = (name: string) => {
    createTag({ name, id: uuid() }).then(() => navigate('/app/buchungen')).catch((error) => console.log(error));
  };

  return (
    <>
      <TagList />
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={(value) => submitTag(value.name)}>
        {({ handleSubmit }) => (
          <Form
            className='ui form'
            onSubmit={handleSubmit}>
            <MyTextInput placeholder='Name' name='name' />
            <Button
              positive
              content='Speichern'
              type='submit'
              fluid />
          </Form>
        )}

      </Formik>
    </>
  );
};

export default TagForm;