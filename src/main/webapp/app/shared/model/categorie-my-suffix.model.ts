import { Moment } from 'moment';
import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

export interface ICategorieMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  libelle?: string;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  partenaires?: IPartenaireMySuffix[];
  articles?: IArticleMySuffix[];
}

export class CategorieMySuffix implements ICategorieMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public libelle?: string,
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
