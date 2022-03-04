import { observer } from 'mobx-react-lite';
import { Button, Divider, Header, List, Segment } from 'semantic-ui-react';
import { Tag } from '../../../app/models/tag';
import { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { BuchungFormValues } from '../../../app/models/buchung';

interface Props {
  buchung: BuchungFormValues;
  addTag: (tag: Tag) => void;
  removeTag: (tag: Tag) => void;
}

const TagForm = ({ buchung, addTag, removeTag }: Props) => {
  const { tagStore: { getTags } } = useStore();
  const [tags] = useState<Tag[]>(getTags);

  useEffect(() => {
    console.log('Tag Form Effect', buchung.tags.length);
  }, [buchung]);

  return (
    <>
      <Header content='Tags Aussuchen' color='orange' />
      <p>Gewählte Tags sollten markiert sein. Man kann diese dann abwählen oder wählen</p>
      <Segment>
        {tags.map(tag => (
          <Button content={tag.name}
                  type='button'
                  key={tag.name}
                  onClick={() => addTag(tag)} />
        ))}
      </Segment>
    </>

  )
    ;
};

export default TagForm;