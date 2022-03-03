import { makeAutoObservable, runInAction } from 'mobx';

import { Buchung } from '../models/buchung';
import agent from '../api/agent';
import { format } from 'date-fns';
import { Tag } from '../models/tag';

export default class BuchungStore {
  buchungRegistry = new Map<string, Buchung>();
  selectedBuchung: Buchung | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  addTag = (buchung: Buchung, tag: Tag) => {
    runInAction(() => {
      buchung.tags =  [...buchung.tags, tag];
    });
  };

  removeTag = (buchung: Buchung, tag: Tag) => {
    runInAction(() => {
      buchung.tags = [...buchung.tags.filter(t => t.id !== tag.id)];
    })
  }

  get buchungenByDate() {
    return Array.from(this.buchungRegistry.values()).sort(
      (a, b) => a.zeitpunkt!.getTime() - b.zeitpunkt!.getTime(),
    );
  }

  get getTags(){
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

  get einnahmenGesamt() {
    return Array.from(this.buchungRegistry.values())
      .filter((buchung) => buchung.kategorie === 1)
      .map((buchung) => buchung.betrag)
      .reduce((prev, curr) => {
        if (prev && curr) return prev + curr;
        if (!prev) return curr;
        return prev;
      }, 0);
  }

  get ausgabenGesamt() {
    return Array.from(this.buchungRegistry.values())
      .filter((buchung) => buchung.kategorie === 2)
      .map((buchung) => buchung.betrag)
      .reduce((prev, curr) => {
        if (prev && curr) return prev + curr;
        if (!prev) return curr;
        return prev;
      }, 0);
  }

  get ausgabenNurMonatlich() {
    return Array.from(this.buchungRegistry.values())
      .filter((buchung) => buchung.kategorie === 2 && buchung.intervall < 3)
      .map((buchung) => buchung.betrag)
      .reduce((prev, curr) => {
        if (prev && curr) return prev + curr;
        if (!prev) return curr;
        return prev;
      }, 0);
  }

  get restMonatlich() {
    return this.einnahmenGesamt! - this.ausgabenNurMonatlich!;
  }

  get restMonatlichVerrechnet() {
    return this.einnahmenGesamt! - this.ausgabenGesamt!;
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
        runInAction(() => {
          this.selectedBuchung = buchung;
        });
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

  createBuchung = async (buchung: Buchung) => {
    this.loading = true;
    try {
      await agent.Buchungen.create(buchung);
      runInAction(() => {
        // this.buchungen.push(buchung);
        this.buchungRegistry.set(buchung.id, buchung);
        this.selectedBuchung = buchung;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateBuchung = async (buchung: Buchung) => {
    this.loading = true;
    try {
      await agent.Buchungen.update(buchung);
      runInAction(() => {
        // this.buchungen = [...this.buchungen.filter(a => a.id !== buchung.id), buchung];
        this.buchungRegistry.set(buchung.id, buchung);
        this.selectedBuchung = buchung;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };


  deleteBuchung = async (id: string) => {
    this.loading = true;
    try {
      await agent.Buchungen.delete(id);
      runInAction(() => {
        // this.buchungen = [...this.buchungen.filter(a => a.id !== id)];
        this.buchungRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
