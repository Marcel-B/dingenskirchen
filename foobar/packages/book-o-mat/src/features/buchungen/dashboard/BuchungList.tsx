import BuchungListItem from './BuchungListItem';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
// import { Card, CardContent, Typography } from '@mui/material';
// import CalendarToday from '@mui/icons-material/CalendarToday';

const BuchungList = () => {
  const { buchungStore } = useStore();
  const { groupedBuchungen } = buchungStore;

  return (
    <>
      {
        groupedBuchungen.map(([group, buchungen]) => (
          <div key={group} style={{marginBottom: '2em'}}>
              <h5>{group}</h5> 
                              {buchungen.map((buchung) => (
                <BuchungListItem key={buchung.id} buchung={buchung} />
              ))}
          </div>
        ))
      }
    </>
  );
};

export default observer(BuchungList);
