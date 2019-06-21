import { Moment } from 'moment';
import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

export const enum TypeReduction {
  POURCENTAGE = 'POURCENTAGE',
  PRIX = 'PRIX'
}

export interface IReductionMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  libelle?: string;
  typeReduction?: TypeReduction;
  valeurReduction?: number;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  partenaires?: IPartenaireMySuffix[];
  articles?: IArticleMySuffix[];
}

export class ReductionMySuffix implements IReductionMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public libelle?: string,
    public typeReduction?: TypeReduction,
    public valeurReduction?: number,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public partenaires?: IPartenaireMySuffix[],
    public articles?: IArticleMySuffix[]
  ) {
    this.estActif = this.estActif || false;
  }
}
