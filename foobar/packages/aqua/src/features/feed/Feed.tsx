import { Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { feedSelectors, fetchFeedAsync } from '../../store/feedSlice';
import { useEffect } from 'react';

const Feed = () => {
  const feed = useAppSelector(feedSelectors.selectAll);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeedAsync());
  }, []);

  return (
    <>
      <Typography variant='h4'>Feed</Typography>
      <Divider orientation='horizontal' />
      <ul>
        {feed.map((f, i) => (<li key={i}>{f.datum}|{f.aquaType}</li>))}
      </ul>
      <br />
    </>
  );
};

export default Feed;