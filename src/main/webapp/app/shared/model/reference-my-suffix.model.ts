import { Moment } from 'moment';
import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';

export interface IReferenceMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  libelleRef?: string;
  valeurRef?: string;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  partenaires?: IPartenaireMySuffix[];
}

export class ReferenceMySuffix implements IReferenceMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public libelleRef?: string,
    public valeurRef?: string,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public partenaires?: IPartenaireMySuffix[]
  ) {
    this.estActif = this.estActif || false;
  }
}
