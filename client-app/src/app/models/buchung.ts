export interface Buchung {
  id: string;
  name: string;
  beschreibung: string;
  zeitpunkt: Date | null;
  betrag: number;
  kategorie: string;
  intervall: string;
  created?: Date | null;
  updated?: Date | null;
}
