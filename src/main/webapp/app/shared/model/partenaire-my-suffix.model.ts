import { Moment } from 'moment';
import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';

export interface IPartenaireMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  raisonSociale?: string;
  nombreSalaries?: number;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  langueId?: number;
  adresseId?: number;
  referencesId?: number;
  categoriesId?: number;
  articlesId?: number;
  reductionsId?: number;
  profilesId?: number;
  habilitationsId?: number;
  fournisseursId?: number;
  employes?: IEmployeMySuffix[];
}

export class PartenaireMySuffix implements IPartenaireMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public raisonSociale?: string,
    public nombreSalaries?: number,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public langueId?: number,
    public adresseId?: number,
    public referencesId?: number,
    public categoriesId?: number,
    public articlesId?: number,
    public reductionsId?: number,
    public profilesId?: number,
    public habilitationsId?: number,
    public fournisseursId?: number,
    public employes?: IEmployeMySuffix[]
  ) {
    this.estActif = this.estActif || false;
  }
}
