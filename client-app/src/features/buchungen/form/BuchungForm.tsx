import { Button, Header, Segment } from 'semantic-ui-react';
import { Form, Formik } from 'formik';
import { intervallOptions, kategorieOptions } from "../../../app/common/options/categoryOptions";

import { Buchung } from '../../../app/models/buchung';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useState } from 'react';
import { useStore } from '../../../app/stores/store';

const BuchungForm = () => {
  const { buchungStore } = useStore();
  const [buchung, setBuchung] = useState<Buchung>({
    name: '',
    beschreibung: '',
    betrag: 0,
    zeitpunkt: null,
    kategorie: '',
    intervall: '',
    id: '',
  });

  return (
    <Segment clearing style={{ marginTop: 80 }}>
      <Header content='Neue Buchung' sub color='teal' />
      <Formik
        initialValues={buchung}
        onSubmit={(values) => console.log(values)}>
        {({ handleSubmit }) => (
          <Form className='ui form' onSubmit={handleSubmit}>
            <MyTextInput placeholder='Name' name='name' />
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

            <Button floated='right' positive type='submit' content='Submit' />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
export default BuchungForm;
