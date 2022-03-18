import BuchungListItem from './BuchungListItem';
import { useAppDispatch, useAppSelector } from '../../../app/stores';
import { useEffect } from 'react';
import { Buchung } from '../../../app/models/buchung';
import { buchungenSelectors, fetchBuchungenAsync } from '../../../app/stores/buchungenSlice';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

const BuchungList = () => {
  const buchungen = useAppSelector(buchungenSelectors.selectAll);
  const { buchungenGeladen, status } = useAppSelector(state => state.buchungen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!buchungenGeladen) {
      dispatch(fetchBuchungenAsync());
    }
  }, [buchungenGeladen]);

  if (status.includes('pending')) return <LoadingComponent status={'Lade Buchungen ...'} />;
  return (
    <>
      {
        buchungen.map((buchung: Buchung) => (
          <BuchungListItem key={buchung.id} buchung={buchung} />
        ))
      }
    </>
  );
};

export default BuchungList;
