import { Moment } from 'moment';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { IFournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';
import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';

export interface ILangueMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  libelle?: string;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  paysId?: number;
  clients?: IClientMySuffix[];
  partenaires?: IPartenaireMySuffix[];
  fournisseurs?: IFournisseurMySuffix[];
  employes?: IEmployeMySuffix[];
}

export class LangueMySuffix implements ILangueMySuffix {
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
    public paysId?: number,
    public clients?: IClientMySuffix[],
    public partenaires?: IPartenaireMySuffix[],
    public fournisseurs?: IFournisseurMySuffix[],
    public employes?: IEmployeMySuffix[]
  ) {
    this.estActif = this.estActif || false;
  }
}
