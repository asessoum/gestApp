import { Moment } from 'moment';

export interface IUtiProfileMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  employeId?: number;
  profileId?: number;
}

export class UtiProfileMySuffix implements IUtiProfileMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public employeId?: number,
    public profileId?: number
  ) {
    this.estActif = this.estActif || false;
  }
}
