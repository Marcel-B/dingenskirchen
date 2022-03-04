import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { useEffect } from 'react';
import {Chip, Grid} from "@mui/material";

const TagList = () => {
  const { tagStore: { tags, loadTags, deleteTag } } = useStore();

  useEffect(() => {
    loadTags().catch((error) => console.log(error));
  }, [loadTags]);

  return (
    <Grid container spacing={2}>
      {tags.map(tag => (
        <Grid key={tag.id} item>
          <Chip label={tag.name} variant="outlined" onDelete={() => deleteTag(tag.id)}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default observer(TagList);
