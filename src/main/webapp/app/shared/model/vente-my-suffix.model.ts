import { Moment } from 'moment';

export interface IVenteMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  quantite?: number;
  prixVente?: number;
  margeVente?: number;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  commandeId?: number;
  articleId?: number;
}

export class VenteMySuffix implements IVenteMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public quantite?: number,
    public prixVente?: number,
    public margeVente?: number,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public commandeId?: number,
    public articleId?: number
  ) {}
}
