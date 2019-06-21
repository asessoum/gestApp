import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';

export interface IAdresseMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  numeroRue?: number;
  nomRue?: string;
  complement?: string;
  fournisseurId?: number;
  utilisateurId?: number;
  communeId?: number;
  partenaires?: IPartenaireMySuffix[];
  clients?: IClientMySuffix[];
}

export class AdresseMySuffix implements IAdresseMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public numeroRue?: number,
    public nomRue?: string,
    public complement?: string,
    public fournisseurId?: number,
    public utilisateurId?: number,
    public communeId?: number,
    public partenaires?: IPartenaireMySuffix[],
    public clients?: IClientMySuffix[]
  ) {}
}
