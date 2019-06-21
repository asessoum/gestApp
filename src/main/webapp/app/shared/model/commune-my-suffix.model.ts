import { Moment } from 'moment';
import { IAdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';

export interface ICommuneMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  nomCommune?: string;
  nomProvince?: string;
  nomRegion?: string;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  paysId?: number;
  adresses?: IAdresseMySuffix[];
}

export class CommuneMySuffix implements ICommuneMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public nomCommune?: string,
    public nomProvince?: string,
    public nomRegion?: string,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public paysId?: number,
    public adresses?: IAdresseMySuffix[]
  ) {
    this.estActif = this.estActif || false;
  }
}
