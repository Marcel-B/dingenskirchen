import { Divider, Typography } from '@mui/material';
import { format } from 'date-fns';

interface Props {
  datum: Date;
  text: string;
}

const FeedItemHeadline = ({ ...props }: Props) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h4'>{format(new Date(props.datum), 'dd.MM.yyyy')}</Typography>
        <Typography variant='h6' style={{ color: 'gray' }}>{props.text.toUpperCase()}</Typography>
      </div>
      <Divider orientation='horizontal' />
      <br />
    </>
  );
};

export default FeedItemHeadline;
