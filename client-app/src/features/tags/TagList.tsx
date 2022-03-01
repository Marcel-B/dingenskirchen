import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { List } from 'semantic-ui-react';
import { useEffect } from 'react';

const TagList = () => {
  const { tagStore: { tags, loadTags } } = useStore();

  useEffect(() => {
    loadTags().catch((error) => console.log(error));
  }, [tags, loadTags]);

  return (
    <List>
      {tags.map(tag => (<List.Item content={tag.name} />))}
    </List>
  );
};

export default observer(TagList);