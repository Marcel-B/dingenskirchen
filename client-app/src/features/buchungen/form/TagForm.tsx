import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { Button, Divider, Header, List, Segment } from 'semantic-ui-react';
import { Tag } from '../../../app/models/tag';
import { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { Buchung } from '../../../app/models/buchung';

interface Props {
  id: string;
  buchung: Buchung;
}

const TagForm = ({ id, buchung }: Props) => {
  const initial = {};
  const { buchungStore: { addTag, removeTag, loadBuchung }, tagStore: { getTags } } = useStore();
  const [tags] = useState<Tag[]>(getTags);

  useEffect(() => {
      loadBuchung(id).catch(error => console.log(error));
    },
    [loadBuchung, id, buchung.tags]);

  const handleRemoveTag = (tag: Tag) => {
    removeTag(buchung, tag);
  };

  const handleAddTag = (tag: Tag) => {
    addTag(buchung, tag);
  };

  return (
    <Segment>
      <Header content='Tags Aussuchen' color='orange' />
      <Formik
        onSubmit={(values) => console.log(values)}
        initialValues={initial}>
        {({ handleSubmit, isSubmitting }) => (
          <>
            <Segment>
              {tags.map(tag => (
                <Button content={tag.name}
                        type='button'
                        key={tag.name}
                        onClick={() => handleAddTag(tag)} />
              ))}
            </Segment>
            <Divider horizontal />
            <Segment>
              <List>
                {buchung.tags.map(tag => (
                  <Button content={tag.name}
                          type='button'
                          key={tag.id}
                          onClick={() => handleRemoveTag(tag)} />
                ))}
              </List>
            </Segment>
          </>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(TagForm);