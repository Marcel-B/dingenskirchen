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
