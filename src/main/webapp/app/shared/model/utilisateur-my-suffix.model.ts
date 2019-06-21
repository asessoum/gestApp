import { Moment } from 'moment';

export interface IUtilisateurMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  login?: string;
  mdp?: string;
  nom?: string;
  prenom?: string;
  dateNaissance?: Moment;
  telephone?: string;
  email?: string;
  dateMajMdp?: Moment;
  statusConnexion?: boolean;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  employeId?: number;
}

export class UtilisateurMySuffix implements IUtilisateurMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public login?: string,
    public mdp?: string,
    public nom?: string,
    public prenom?: string,
    public dateNaissance?: Moment,
    public telephone?: string,
    public email?: string,
    public dateMajMdp?: Moment,
    public statusConnexion?: boolean,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public employeId?: number
  ) {
    this.statusConnexion = this.statusConnexion || false;
    this.estActif = this.estActif || false;
  }
}
