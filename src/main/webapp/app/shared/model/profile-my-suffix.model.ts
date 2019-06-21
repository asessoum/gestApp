import { Moment } from 'moment';
import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { IUtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';

export interface IProfileMySuffix {
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
  employes?: IUtiProfileMySuffix[];
}

export class ProfileMySuffix implements IProfileMySuffix {
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
    public employes?: IUtiProfileMySuffix[]
  ) {
    this.estActif = this.estActif || false;
  }
}
