import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { Button, Grid, Icon, List } from 'semantic-ui-react';
import { useEffect } from 'react';

const TagList = () => {
  const { tagStore: { tags, loadTags, deleteTag } } = useStore();

  useEffect(() => {
    loadTags().catch((error) => console.log(error));
  }, [loadTags]);

  return (
    <List>
      {tags.map(tag => (<>
        <List.Item key={tag.id}>
          <Grid columns={2}>
            <Grid.Column>
              {tag.name}
            </Grid.Column>
            <Grid.Column>
              <Button icon color='red' onClick={() => deleteTag(tag.id)}>
                <Icon name='times' />
              </Button>
            </Grid.Column>
          </Grid>
        </List.Item></>))}
    </List>
  );
};

export default observer(TagList);
