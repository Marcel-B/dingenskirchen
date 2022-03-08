import { Tag } from './tag';

export interface Buchung {
  id: string;
  name: string;
  beschreibung: string;
  zeitpunkt: Date | null;
  betrag: number | null;
  kategorie: number;
  intervall: number;
  created?: Date | null;
  updated?: Date | null;
  tags: Tag[];
}

export class Buchung implements Buchung {
  constructor(init?: BuchungFormValues) {
    Object.assign(this, init);
  }
}

export class BuchungFormValues {
  id?: string = undefined;
  name: string = '';
  beschreibung: string = '';
  zeitpunkt: Date | null = null;
  betrag: number | null = null;
  kategorie: number = 0;
  intervall: number = 0;
  created?: Date | null = null;
  updated?: Date | null = null;
  tags: Tag[] = [];

  constructor(buchung?: BuchungFormValues) {
    if (buchung) {
      this.id = buchung.id;
      this.name = buchung.name;
      this.beschreibung = buchung.name;
      this.kategorie = buchung.kategorie;
      this.intervall = buchung.intervall;
      this.zeitpunkt = buchung.zeitpunkt;
      this.betrag = buchung.betrag;
      this.tags = buchung.tags;
    }
  }
}