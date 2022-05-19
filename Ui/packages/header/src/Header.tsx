import React from 'react';
import { AppLink } from 'shared-types';

const Header = ({ appLinks }: { appLinks: AppLink[] }) => {
  return (
    <div style={{ background: 'cornflowerblue', margin: 0, padding: 0 }}>
      <h1>Awesome Header Here</h1>
      {
        appLinks.map((link, idx) => <span key={idx}>{link.name} | </span>)
      }
    </div>
  );
};

export default Header;