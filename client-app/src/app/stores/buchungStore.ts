import { Buchung, BuchungFormValues } from '../models/buchung';
import agent from '../api/agent';
import { format } from 'date-fns';
import { Tag } from '../models/tag';
import exp from 'constants';

export default class BuchungStore {
  buchungRegistry = new Map<string, Buchung>();
  selectedBuchung: Buchung | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;


  addTag = (buchung: BuchungFormValues, tag: Tag) => {
    buchung.tags = [...buchung.tags, tag];
  };

  removeTag = (buchung: BuchungFormValues, tag: Tag) => {
    buchung.tags = [...buchung.tags.filter(t => t.id !== tag.id)];
  };

  get buchungenByDate() {
    return Array.from(this.buchungRegistry.values()).sort(
      (a, b) => a.zeitpunkt!.getTime() - b.zeitpunkt!.getTime(),
    );
  }

  get getTags() {
    return this.selectedBuchung?.tags;
  }

  get groupedBuchungen() {
    return Object.entries(
      this.buchungenByDate.reduce((buchungen, buchung) => {
        const zeitpunkt = format(buchung.zeitpunkt!, 'dd.MM.yyyy');
        buchungen[zeitpunkt] = buchungen[zeitpunkt]
          ? [...buchungen[zeitpunkt], buchung]
          : [buchung];
        return buchungen;
      }, {} as { [key: string]: Buchung[] }),
    );
  }



  loadBuchungen = async () => {
    this.loadingInitial = true;
    try {
      const buchungen = await agent.Buchungen.list();
      buchungen.forEach((buchung) => {
        this.setBuchung(buchung);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadBuchung = async (id: string) => {
    let buchung = this.getBuchung(id);
    if (buchung) {
      this.selectedBuchung = buchung;
      return buchung;
    } else {
      this.loadingInitial = true;
      try {
        buchung = await agent.Buchungen.details(id);
        this.setBuchung(buchung);
        this.selectedBuchung = buchung;
        this.setLoadingInitial(false);
        return buchung;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private getBuchung = (id: string) => {
    return this.buchungRegistry.get(id);
  };

  private setBuchung = (buchung: Buchung) => {
    buchung.zeitpunkt = new Date(buchung.zeitpunkt!);
    this.buchungRegistry.set(buchung.id, buchung);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createBuchung = async (buchung: BuchungFormValues) => {
    this.loading = true;
    try {
      await agent.Buchungen.create(buchung);
      const newBuchung = new Buchung(buchung);
      this.setBuchung(newBuchung);
      // this.buchungen.push(buchung);
      this.selectedBuchung = newBuchung;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  updateBuchung = async (buchung: BuchungFormValues) => {
    this.loading = true;
    try {
      await agent.Buchungen.update(buchung);
      if (buchung.id) {
        let updatedBuchung = { ...this.getBuchung(buchung.id), ...buchung };
        this.buchungRegistry.set(buchung.id, updatedBuchung as Buchung);
        this.selectedBuchung = updatedBuchung as Buchung;
      }
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };


  deleteBuchung = async (id: string) => {
    this.loading = true;
    try {
      await agent.Buchungen.delete(id);
      // this.buchungen = [...this.buchungen.filter(a => a.id !== id)];
      this.buchungRegistry.delete(id);
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };
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
}

export const restMonatlichReal = (buchungen: Buchung[]) => {
  return (einnahmenGesamt(buchungen) ?? 0) - (ausgabenMonatlichReal(buchungen) ?? 0);
}
