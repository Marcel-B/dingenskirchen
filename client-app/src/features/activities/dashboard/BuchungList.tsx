import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import BuchungListItem from './BuchungListItem';

const BuchungList = () => {
  const { buchungStore } = useStore();
  const { groupedBuchungen } = buchungStore;

  return (
    <>
      {groupedBuchungen.map(([group, buchungen]) => (
        <Fragment key={group}>
          <Header sub color={`teal`}>
            {group}
          </Header>
          {buchungen.map((buchung) => (
            <BuchungListItem key={buchung.id} buchung={buchung} />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default observer(BuchungList);
