import { Box, Card, Divider, Fab, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchFeedAsync } from './feedSlice';
import { useEffect } from 'react';
import FeedItem from './FeedItem';
import moment from 'moment-with-locales-es6';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SetMealIcon from '@mui/icons-material/SetMeal';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ScienceIcon from '@mui/icons-material/Science';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { addNotiz } from "../notiz/notizSlice";
import NotizDialog from "../notiz/NotizDialog";
import { notiz } from "../notiz/notizStyle";
import { duenger } from "../duengung/duengungStyle";
import { messung } from "../messung/messungStyle";
import { fisch } from "../fisch/fischStyle";
import DuengungDialog from "../duengung/DuengungDialog";
import { addDuengung } from "../duengung/duengungSlice";
import { addMessung } from "../messung/messungSlice";
import MessungDialog from "../messung/MessungDialog";
import FischDialog from "../fisch/FischDialog";
import { addFisch } from "../fisch/fischSlice";

//const caard = deepPurple['400'];
const actions = [
  {icon: <HistoryEduIcon/>, name: 'Copy'},
];

const Feed = () => {
  const feed = useAppSelector(state => state.feed.feed.groupedFeeds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeedAsync());
  }, []);

  const formatValue = (date: Date) => {
    return moment(new Date(date)).locale('de').fromNow();
  }

  const handleNeueNotiz = () => {
    dispatch(addNotiz());
  }

  const handleNeueDuengung = () => {
    dispatch(addDuengung());
  }

  const handleNeuerFisch = () => {
    dispatch(addFisch());
  }

  const handleNeueMessung = () => {
    dispatch(addMessung())
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h3' sx={{color: 'text.secondary'}}>Aquabook</Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Fab
            onClick={() => handleNeueNotiz()}
            sx={{bgcolor: notiz, mr: 1}}
            variant="extended">
            <StickyNote2Icon sx={{mr: 1}}/>
            Notiz
          </Fab>
          <Fab
            onClick={() => handleNeueDuengung()}
            variant="extended"
            sx={{bgcolor: duenger, mr: 1}}>
            <ScienceIcon sx={{mr: 1}}/>
            Dünger
          </Fab>
          <Fab
            onClick={() => handleNeueMessung()}
            variant="extended"
            sx={{bgcolor: messung, mr: 1}}>
            <DeviceThermostatIcon sx={{mr: 1}}/>
            Messung
          </Fab>
          <Fab
            onClick={() => handleNeuerFisch()}
            variant="extended"
            sx={{bgcolor: fisch}}>
            <SetMealIcon sx={{mr: 1}}/>
            Fisch
          </Fab>
        </Box>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{position: 'absolute', bottom: 16, right: 16}}
          icon={<SpeedDialIcon/>}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
      <Divider orientation='horizontal' sx={{mb: 1}}/>
      <NotizDialog/>
      <DuengungDialog/>
      <MessungDialog/>
      <FischDialog/>
      <ul>
        {feed.map(groupedFeed => (
          <Card sx={{
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
          </Card>))}
      </ul>
      <br/>
    </>);
};

export default Feed;