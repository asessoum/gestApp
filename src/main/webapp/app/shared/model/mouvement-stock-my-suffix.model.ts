import { Moment } from 'moment';
import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

export const enum TypeMouvementStock {
  ENTREE = 'ENTREE',
  SORTIE = 'SORTIE'
}

export interface IMouvementStockMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  quantiteTotal?: number;
  prixTotal?: number;
  prixHT?: number;
  tva?: number;
  validSup?: boolean;
  validRes?: boolean;
  estActif?: boolean;
  type?: TypeMouvementStock;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  articles?: IArticleMySuffix[];
}

export class MouvementStockMySuffix implements IMouvementStockMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public quantiteTotal?: number,
    public prixTotal?: number,
    public prixHT?: number,
    public tva?: number,
    public validSup?: boolean,
    public validRes?: boolean,
    public estActif?: boolean,
    public type?: TypeMouvementStock,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public articles?: IArticleMySuffix[]
  ) {
    this.validSup = this.validSup || false;
    this.validRes = this.validRes || false;
    this.estActif = this.estActif || false;
  }
}
