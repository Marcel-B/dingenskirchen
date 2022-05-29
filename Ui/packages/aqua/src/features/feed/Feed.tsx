import { Card, Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchFeedAsync } from './feedSlice';
import { useEffect } from 'react';
import FeedItem from './FeedItem';
import moment from 'moment-with-locales-es6';
import NotizDialog from "../notiz/NotizDialog";
import DuengungDialog from "../duengung/DuengungDialog";
import MessungDialog from "../messung/MessungDialog";
import FischDialog from "../fisch/FischDialog";
import AquariumDialog from "../aquarium/AquariumDialog";
import LoginDialog from "../../common/user/LoginDialog";

const Feed = () => {
  const feed = useAppSelector(state => state.feed.feed.groupedFeeds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeedAsync());
  }, []);

  const formatValue = (date: Date) => {
    return moment(new Date(date)).locale('de').fromNow();
  }

  return (
    <>
      <ul>
        {feed.length > 0 ? feed.map(groupedFeed =>
          <Card key={groupedFeed.datum.toString()} sx={{
            p: 2,
            m: 1,
          }}>
            <Typography variant='h4'>{formatValue(groupedFeed.datum)}</Typography>
            <Divider orientation='horizontal' sx={{
              m: 1
            }}/>
            {groupedFeed.feedItems.map(feedItem => (
              <FeedItem
                key={feedItem.id}
                aquaType={feedItem.aquaType}
                item={feedItem.item}
                datum={moment(new Date(feedItem.item.datum)).locale('de').format('LLLL')}
                id={feedItem.id}/>
            ))}
          </Card>) : <Typography variant='h1'>Bitte anmelden</Typography>}
      </ul>
      <br/>
    </>);
};

export default Feed;