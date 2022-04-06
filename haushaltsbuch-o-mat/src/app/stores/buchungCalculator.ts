import { Buchung } from '../models/buchung';
import { format } from 'date-fns';

export function buchungenByDate(buchungen: Buchung[]) {
  return buchungen.sort(
    (a, b) => a.zeitpunkt!.getTime() - b.zeitpunkt!.getTime(),
  );
}

export function groupedBuchungen(buchungen: Buchung[]) {
  return Object.entries(
    buchungenByDate(buchungen).reduce((buchungen, buchung) => {
      const zeitpunkt = format(buchung.zeitpunkt!, 'dd.MM.yyyy');
      buchungen[zeitpunkt] = buchungen[zeitpunkt]
        ? [...buchungen[zeitpunkt], buchung]
        : [buchung];
      return buchungen;
    }, {} as { [key: string]: Buchung[] }),
  );
}

/**
 * Ausgaben monatlich gerechnet.
 * Beträge die im gewählten Monat fällig sind, oder ausgegeben worden
 * sind. Eine jährliche Versicherung wird nur dann berechnet, wenn sie auch
 * im gewählten Monat fällig ist.
 */
export const ausgabenMonatlichReal = (buchungen: Buchung[]) => {
  return buchungen
    .filter((buchung) => buchung.kategorie === 2 && buchung.intervall! < 3)
    .map((buchung) => buchung.betrag)
    .reduce((prev, curr) => {
      if (prev && curr) return prev + curr;
      if (!prev) return curr;
      return prev;
    }, 0);
};

/**
 * Wiederkehrende Ausgaben, monatlich gerechnet.
 * Z.B. die Miete, aber auch Versicherungen, welche 1 mal im Jahr
 * fällig werden, werden hier auf die Monate verteilt.
 */
export const ausgabenGesamt = (buchungen: Buchung[]) => {
  return buchungen
    .filter((buchung) => buchung.kategorie === 2)
    .map((buchung) => buchung.betrag)
    .reduce((prev, curr) => {
      if (prev && curr) return prev + curr;
      if (!prev) return curr;
      return prev;
    }, 0);
};

/**
 * Wiederkerende Einnamen, monatlich gerechnet.
 * Z.B. Das Gehalt, was jeden Monat kommt.
 * @param buchungen
 */
export const einnahmenGesamt = (buchungen: Buchung[]) => {
  return buchungen
    .filter((buchung) => buchung.kategorie === 1)
    .map((buchung) => buchung.betrag)
    .reduce((prev, curr) => {
      if (prev && curr) return prev + curr;
      if (!prev) return curr;
      return prev;
    }, 0);
};

export const restMonatlich = (buchungen: Buchung[]) => {
  return (einnahmenGesamt(buchungen) ?? 0) - (ausgabenGesamt(buchungen) ?? 0);
};

export const restMonatlichReal = (buchungen: Buchung[]) => {
  return (einnahmenGesamt(buchungen) ?? 0) - (ausgabenMonatlichReal(buchungen) ?? 0);
};
