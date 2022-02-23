import React, { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';

export default observer(function ActivityForm() {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    loadingInitial,
    createActivity,
    updateActivity,
    loading,
    loadActivity,
  } = activityStore;

  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('Titel ist ein Pflichtfeld'),
    description: Yup.string().required('Beschreibung ist ein Pflichtfeld'),
    category: Yup.string().required(),
    date: Yup.string().required('Datum ist ein Pflichtfeld').nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id)
        .then((activity) => setActivity(activity!))
        .catch((error) => console.log(error));
    }
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`),
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`),
      );
    }
  };

  if (loadingInitial) return <LoadingComponent content={`Lade Buchung...`} />;

  return (
    <Segment clearing>
      <Header content={`Activity Details`} sub color={`teal`} />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className={`ui form`} onSubmit={handleSubmit} autoComplete={`off`}>
            <MyTextInput placeholder={`Title`} name={`title`} />
            <MyTextArea placeholder={`Description`} rows={3} name={`description`} />
            <MySelectInput options={categoryOptions} placeholder={`Category`} name={`category`} />
            <MyDateInput
              name={`date`}
              placeholderText={`Datum`}
              showTimeSelect
              timeCaption={'time'}
              dateFormat='dd MMMM, yyyy HH:mm' />
            <Header content={`Location Details`} sub color={`teal`} />
            <MyTextInput placeholder={`City`} name={`city`} />
            <MyTextInput placeholder={`Venue`} name={`venue`} />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated={`right`}
              positive
              type={`submit`}
              content={`Übertragen`}
            />
            <Button
              as={Link}
              to={`/activities`}
              floated={`right`}
              type={`button`}
              content={`Abbrechen`}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
