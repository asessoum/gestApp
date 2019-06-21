import { Moment } from 'moment';

export interface IFactureMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  estReglee?: boolean;
  recu?: string;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  commandeId?: number;
}

export class FactureMySuffix implements IFactureMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public estReglee?: boolean,
    public recu?: string,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public commandeId?: number
  ) {
    this.estReglee = this.estReglee || false;
  }
}
