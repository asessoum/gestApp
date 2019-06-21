import { Moment } from 'moment';
import { IVenteMySuffix } from 'app/shared/model/vente-my-suffix.model';

export interface ICommandeMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  quantiteTotal?: number;
  prixTotalCommande?: number;
  prixHT?: number;
  tva?: number;
  validSup?: boolean;
  validRes?: boolean;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  factureId?: number;
  clientId?: number;
  commercialId?: number;
  ventes?: IVenteMySuffix[];
}

export class CommandeMySuffix implements ICommandeMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public quantiteTotal?: number,
    public prixTotalCommande?: number,
    public prixHT?: number,
    public tva?: number,
    public validSup?: boolean,
    public validRes?: boolean,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public factureId?: number,
    public clientId?: number,
    public commercialId?: number,
    public ventes?: IVenteMySuffix[]
  ) {
    this.validSup = this.validSup || false;
    this.validRes = this.validRes || false;
    this.estActif = this.estActif || false;
  }
}
