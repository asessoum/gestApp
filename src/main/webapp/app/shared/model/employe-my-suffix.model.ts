import { Moment } from 'moment';
import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';
import { IAdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';
import { IUtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ICommandeMySuffix } from 'app/shared/model/commande-my-suffix.model';

export const enum Genre {
  HOMME = 'HOMME',
  FEMME = 'FEMME'
}

export interface IEmployeMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  genre?: Genre;
  numCarteUti?: string;
  dateCarteUti?: Moment;
  photoID?: string;
  description?: string;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  utilisateurId?: number;
  responsableId?: number;
  langues?: ILangueMySuffix[];
  adresses?: IAdresseMySuffix[];
  profiles?: IUtiProfileMySuffix[];
  clients?: IClientMySuffix[];
  commandes?: ICommandeMySuffix[];
}

export class EmployeMySuffix implements IEmployeMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public genre?: Genre,
    public numCarteUti?: string,
    public dateCarteUti?: Moment,
    public photoID?: string,
    public description?: string,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public utilisateurId?: number,
    public responsableId?: number,
    public langues?: ILangueMySuffix[],
    public adresses?: IAdresseMySuffix[],
    public profiles?: IUtiProfileMySuffix[],
    public clients?: IClientMySuffix[],
    public commandes?: ICommandeMySuffix[]
  ) {
    this.estActif = this.estActif || false;
  }
}
