import BuchungListItem from './BuchungListItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/stores';

const BuchungList = () => {
  const buchungen = useSelector((state: RootState) => state.buchungen);
  return (
    <>
      {
        buchungen.buchungen.map((buchung) => (
          <BuchungListItem key={buchung.id} buchung={buchung} />
        ))
      }
    </>
  );
};

export default BuchungList;
