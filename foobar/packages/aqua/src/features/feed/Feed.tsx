import { Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { feedSelectors, fetchFeedAsync } from '../../store/feedSlice';
import { useEffect } from 'react';
import FeedItem from './FeedItem';

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
        {feed.map((f, i) => (
          <FeedItem key={f.id} datum={f.datum} aquaType={f.aquaType} item={f.item} id={f.id} />))}
      </ul>
      <br />
    </>
  );
};

export default Feed;