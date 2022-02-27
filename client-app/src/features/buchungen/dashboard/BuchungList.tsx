import { Header, Icon } from 'semantic-ui-react';

import BuchungListItem from './BuchungListItem';
import { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';

const BuchungList = () => {
  const { buchungStore } = useStore();
  const { groupedBuchungen } = buchungStore;

  return (
    <div style={{ marginTop: '7em' }} >
      {groupedBuchungen.map(([group, buchungen]) => (
        <Fragment key={group}>
          <Header  color={`teal`} as='h2'>
            <span>
              <Icon name={`calendar alternate outline`} /> {group}
            </span>
          </Header>
          {buchungen.map((buchung) => (
            <BuchungListItem key={buchung.id} buchung={buchung} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default observer(BuchungList);
