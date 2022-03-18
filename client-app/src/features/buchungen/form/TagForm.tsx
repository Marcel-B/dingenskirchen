import { Tag } from '../../../app/models/tag';
import { useEffect, useState } from 'react';
import { BuchungFormValues } from '../../../app/models/buchung';
import { Box, Button } from '@mui/material';

interface Props {
  buchung: BuchungFormValues;
  addTag: (tag: Tag) => void;
  removeTag: (tag: Tag) => void;
}

const TagForm = ({ buchung, addTag, removeTag }: Props) => {

  useEffect(() => {
    console.log('Tag Form Effect', buchung.tags.length);
  }, [buchung]);

  return (
    <>
      <h2>Tags Aussuchen</h2>
      <p>Gewählte Tags sollten markiert sein. Man kann diese dann abwählen oder wählen</p>
      <Box>
        {/*{tags.map(tag => (*/}
        {/*  <Button*/}
        {/*    key={tag.name}*/}
        {/*    onClick={() => addTag(tag)}>{tag.name}</Button>*/}
        {/*))}*/}
      </Box>
    </>

  )
    ;
};

export default TagForm;