import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';

export interface IHabilitationMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  profile?: string;
  ressource?: string;
  permission?: string;
  acces?: string;
  partenaires?: IPartenaireMySuffix[];
}

export class HabilitationMySuffix implements IHabilitationMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public profile?: string,
    public ressource?: string,
    public permission?: string,
    public acces?: string,
    public partenaires?: IPartenaireMySuffix[]
  ) {}
}
