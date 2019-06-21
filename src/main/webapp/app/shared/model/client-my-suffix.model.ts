import { Moment } from 'moment';
import { IAdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';
import { ICommandeMySuffix } from 'app/shared/model/commande-my-suffix.model';

export const enum Genre {
  HOMME = 'HOMME',
  FEMME = 'FEMME'
}

export interface IClientMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  nom?: string;
  prenom?: string;
  naissance?: Moment;
  genre?: Genre;
  numCarteCli?: string;
  dCarteUtil?: Moment;
  tel?: string;
  email?: string;
  photoID?: string;
  description?: string;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  langueId?: number;
  commercialId?: number;
  adresses?: IAdresseMySuffix[];
  commandes?: ICommandeMySuffix[];
}

export class ClientMySuffix implements IClientMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public nom?: string,
    public prenom?: string,
    public naissance?: Moment,
    public genre?: Genre,
    public numCarteCli?: string,
    public dCarteUtil?: Moment,
    public tel?: string,
    public email?: string,
    public photoID?: string,
    public description?: string,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public langueId?: number,
    public commercialId?: number,
    public adresses?: IAdresseMySuffix[],
    public commandes?: ICommandeMySuffix[]
  ) {
    this.estActif = this.estActif || false;
  }
}
