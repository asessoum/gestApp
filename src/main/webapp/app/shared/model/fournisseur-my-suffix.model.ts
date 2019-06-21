import { Moment } from 'moment';
import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';
import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';
import { IAdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';

export interface IFournisseurMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  nomFournisseur?: string;
  tel?: string;
  email?: string;
  siteWeb?: string;
  logo?: string;
  description?: string;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  partenaires?: IPartenaireMySuffix[];
  langues?: ILangueMySuffix[];
  articles?: IArticleMySuffix[];
  adresses?: IAdresseMySuffix[];
}

export class FournisseurMySuffix implements IFournisseurMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public nomFournisseur?: string,
    public tel?: string,
    public email?: string,
    public siteWeb?: string,
    public logo?: string,
    public description?: string,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public partenaires?: IPartenaireMySuffix[],
    public langues?: ILangueMySuffix[],
    public articles?: IArticleMySuffix[],
    public adresses?: IAdresseMySuffix[]
  ) {
    this.estActif = this.estActif || false;
  }
}
