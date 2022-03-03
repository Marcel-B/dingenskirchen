import * as Yup from 'yup';

import { Button, Header, Segment } from 'semantic-ui-react';
import { Form, Formik } from 'formik';
import {
  intervallOptions,
  kategorieOptions,
} from '../../../app/common/options/categoryOptions';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Buchung } from '../../../app/models/buchung';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import TagForm from './TagForm';

const BuchungForm = () => {
  const { buchungStore, tagStore: { tags, loadTags } } = useStore();
  const { createBuchung, updateBuchung, loading, loadBuchung, deleteBuchung } =
    buchungStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [buchung, setBuchung] = useState<Buchung>({
    name: '',
    beschreibung: '',
    betrag: 0,
    zeitpunkt: null,
    kategorie: 0,
    intervall: 0,
    tags: [],
    id: '',
  });

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    betrag: Yup.number().required(),
  });

  const handleFormSubmit = (buchung: Buchung) => {
    if (buchung.id.length > 0) {
      updateBuchung(buchung)
        .then(() => navigate('/app/buchungen'))
        .catch((error) => console.log(error));
    } else {
      buchung.id = uuid();
      createBuchung(buchung)
        .then(() => navigate('/app/buchungen'))
        .catch((error) => console.log(error));
    }
  };

  const handleDelete = (id: string) => {
    deleteBuchung(id)
      .then(() => navigate('/app/buchungen'))
      .catch((error) => console.log(error));
  };

  // const handleAddTag = (tag: Tag) => {
  //   addTag(buchung, tag);
  // };
  //
  // const handleRemoveTag = (tag: Tag) => {
  //   removeTag(buchung, tag);
  // };

  useEffect(() => {
    loadTags().catch(error => console.log(error));
    if (id) {
      loadBuchung(id)
        .then((buchung) => setBuchung(buchung!))
        .catch((error) => console.log(error));
    }
  }, [id, loadBuchung, loadTags]);

  return (
    <Segment clearing style={{ marginTop: '7rem' }}>
      <Header content='Neue Buchung' color='orange' />
      <Formik
        validationSchema={validationSchema}
        initialValues={buchung}
        enableReinitialize
        onSubmit={(values) => handleFormSubmit(values)}>
        {({ handleSubmit, isSubmitting }) => (
          <Form className='ui form' onSubmit={handleSubmit}>
            {/*<Grid>*/}
            {/*  <Grid.Column width={10}>*/}
            <MyTextInput placeholder='Name' type='text' name='name' />
            <MyTextInput placeholder='Betrag' type='number' name='betrag' />
            <MyTextArea
              rows={3}
              placeholder='Beschreibung'
              name='beschreibung'
            />
            <MyDateInput
              placeholderText='Zeitpunkt'
              name='zeitpunkt'
              timeCaption='time'
              dateFormat='d. MMM yyyy'
            />
            <MySelectInput
              options={kategorieOptions}
              placeholder='Kategorie'
              name='kategorie'
            />
            <MySelectInput
              options={intervallOptions}
              placeholder='Intervall'
              name='intervall'
            />
            <TagForm buchung={buchung} id={buchung.id} />
            <Button
              disabled={isSubmitting}
              loading={loading}
              floated='right'
              type='button'
              color='red'
              content='Löschen'
              onClick={() => handleDelete(buchung.id)}
            />
            <Button
              disabled={isSubmitting}
              loading={loading}
              floated='right'
              positive
              type='submit'
              content='Speichern'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
export default observer(BuchungForm);
