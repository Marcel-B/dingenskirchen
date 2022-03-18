import { useEffect } from 'react';
import { Grid } from '@mui/material';

const TagList = () => {
  useEffect(() => {
    // loadTags().catch((error) => console.log(error));
  }, []);

  return (
    <Grid container spacing={2}>
      {/* {tags.map(tag => (*/}
      {/*  <Grid key={tag.id} item>*/}
      {/*    <Chip label={tag.name} variant="outlined" onDelete={() => deleteTag(tag.id)}/>*/}
      {/*  </Grid>*/}
      {/*))}*/}
    </Grid>
  );
};

export default TagList;
