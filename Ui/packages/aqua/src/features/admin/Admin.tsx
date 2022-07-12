import FischListe from "../fisch/FischListe";
import MessungListe from "../messung/MessungListe";
import DuengungListe from "../duengung/DuengungListe";
import AquariumListe from "../aquarium/AquariumListe";
import NotizListe from "../notiz/NotizListe";
import React from 'react';

const Admin = () => {
  return (<>
    <FischListe/>
    <DuengungListe/>
    <MessungListe/>
    <NotizListe/>
    <AquariumListe/>
  </>);
};

export default Admin;