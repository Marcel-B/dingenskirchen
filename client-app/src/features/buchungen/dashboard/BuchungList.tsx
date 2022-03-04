import BuchungListItem from './BuchungListItem';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Card, CardContent, Typography } from '@mui/material';
import CalendarToday from '@mui/icons-material/CalendarToday';

const BuchungList = () => {
  const { buchungStore } = useStore();
  const { groupedBuchungen } = buchungStore;

  return (
    <>
      {
        groupedBuchungen.map(([group, buchungen]) => (
          <Card key={group} style={{marginBottom: '2em'}}>
            <CardContent>
              <Typography variant='h5' sx={{color: 'text.secondary'}}><CalendarToday/> {group} </Typography>
              {buchungen.map((buchung) => (
                <BuchungListItem key={buchung.id} buchung={buchung} />
              ))}
            </CardContent>
          </Card>
        ))
      }
    </>
  );
};

export default observer(BuchungList);
