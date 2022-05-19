import {Card, Divider, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {fetchFeedAsync} from '../../store/feedSlice';
import {useEffect} from 'react';
import FeedItem from './FeedItem';
import moment from 'moment-with-locales-es6';

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
            <Typography variant='h5'>Feed</Typography>
            <Divider orientation='horizontal' sx={{mb: 1}}/>
            <ul>
                {feed.map(groupedFeed => (
                    <Card sx={{
                        p: 2,
                        m: 1
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
        </>
    );
};

export default Feed;