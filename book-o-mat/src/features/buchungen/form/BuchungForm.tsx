import * as Yup from 'yup';

// import { Button, Header, Segment } from 'semantic-ui-react';
// import { Form, Formik } from 'formik';
import {
  intervallOptions,
  kategorieOptions,
} from '../../../app/common/options/categoryOptions';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Buchung, BuchungFormValues } from '../../../app/models/buchung';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
// import { v4 as uuid } from 'uuid';
import TagForm from './TagForm';
import { Tag } from '../../../app/models/tag';

const BuchungForm = () => {
  const { buchungStore, tagStore: { tags, loadTags } } = useStore();
  const { createBuchung, updateBuchung, loading, loadBuchung, deleteBuchung, addTag, removeTag } =
    buchungStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [buchung, setBuchung] = useState<BuchungFormValues>(new BuchungFormValues());

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    betrag: Yup.number().required(),
  });

  const handleFormSubmit = (buchung: BuchungFormValues) => {
    console.log('buchung form', buchung.tags);
    // if (buchung.id) {
    //   updateBuchung(buchung)
    //     .then(() => navigate('/app/buchungen'))
    //     .catch((error) => console.log(error));
    // } else {
    //   let newBuchung = {
    //     ...buchung,
    //     id: uuid(),
    //   };
    //   createBuchung(newBuchung)
    //     .then(() => navigate('/app/buchungen'))
    //     .catch((error) => console.log(error));
    // }
  };

  const handleDelete = (id: string | undefined) => {
    if (id) {
      deleteBuchung(id)
        .then(() => navigate('/app/buchungen'))
        .catch((error) => console.log(error));
    }
  };

  const handleAddTag = (tag: Tag) => {
    console.log('++++++ Add Tag');
    console.log('Add Tag Clicked', tag);
    console.log('Tags', buchung.tags.length);
    buchung.tags.forEach(tag => console.log('Tag:', tag.name));
    console.log('++++++++++++++++++++++++');
  };

  const handleRemoveTag = (tag: Tag) => {
    console.log('------ Remove Tag');
    removeTag(buchung, tag);
    console.log('Remove Tag Clicked', tag);
    console.log('Tags', buchung.tags.length);
    buchung.tags.forEach(tag => console.log('Tag:', tag.name));
    console.log('-------------------------');
  };

  useEffect(() => {
    loadTags().catch(error => console.log(error));
    if (id) {
      loadBuchung(id)
        .then((buchung) => setBuchung(new BuchungFormValues(buchung)))
        .catch((error) => console.log(error));
    }
  }, [id, loadBuchung, loadTags, addTag, removeTag]);

  return (<></>
    // <Segment clearing style={{ marginTop: '7rem' }}>
    //   <Header content='Neue Buchung' color='orange' />
    //   <Formik
    //     validationSchema={validationSchema}
    //     initialValues={buchung}
    //     enableReinitialize
    //     onSubmit={(values) => handleFormSubmit(values)}>
    //     {({ handleSubmit, isSubmitting }) => (
    //       <Form className='ui form' onSubmit={handleSubmit}>
    //         {/*<Grid>*/}
    //         {/*  <Grid.Column width={10}>*/}
    //         <MyTextInput placeholder='Name' type='text' name='name' />
    //         <MyTextInput placeholder='Betrag' type='number' name='betrag' />
    //         <MyTextArea
    //           rows={3}
    //           placeholder='Beschreibung'
    //           name='beschreibung'
    //         />
    //         <MyDateInput
    //           placeholderText='Zeitpunkt'
    //           name='zeitpunkt'
    //           timeCaption='time'
    //           dateFormat='d. MMM yyyy'
    //         />
    //         <MySelectInput
    //           options={kategorieOptions}
    //           placeholder='Kategorie'
    //           name='kategorie'
    //         />
    //         <MySelectInput
    //           options={intervallOptions}
    //           placeholder='Intervall'
    //           name='intervall'
    //         />
    //         <TagForm buchung={buchung} addTag={handleAddTag} removeTag={handleRemoveTag} />
    //         <Button
    //           disabled={isSubmitting}
    //           loading={loading}
    //           floated='right'
    //           type='button'
    //           color='red'
    //           content='Löschen'
    //           onClick={() => handleDelete(buchung.id)}
    //         />
    //         <Button
    //           disabled={isSubmitting}
    //           loading={loading}
    //           floated='right'
    //           positive
    //           type='submit'
    //           content='Speichern'
    //         />
    //       </Form>
    //     )}
    //   </Formik>
    // </Segment>
  );
};
export default observer(BuchungForm);
