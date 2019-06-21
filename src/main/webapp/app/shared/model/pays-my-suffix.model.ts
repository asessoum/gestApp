import { Moment } from 'moment';
import { ICommuneMySuffix } from 'app/shared/model/commune-my-suffix.model';
import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';

export interface IPaysMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  nomPays?: string;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  communes?: ICommuneMySuffix[];
  langues?: ILangueMySuffix[];
}

export class PaysMySuffix implements IPaysMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public nomPays?: string,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public communes?: ICommuneMySuffix[],
    public langues?: ILangueMySuffix[]
  ) {
    this.estActif = this.estActif || false;
  }
}
