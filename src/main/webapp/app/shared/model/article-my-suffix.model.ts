import { Moment } from 'moment';
import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { IVenteMySuffix } from 'app/shared/model/vente-my-suffix.model';
import { IMouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';

export const enum UniteVente {
  UNITAIRE = 'UNITAIRE',
  POIDS = 'POIDS'
}

export interface IArticleMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  libelle?: string;
  description?: string;
  prixDeVente?: number;
  prixDeRevient?: number;
  margeBrute?: number;
  estCompose?: boolean;
  uniteVente?: UniteVente;
  pourcentageTva?: number;
  codeBarre?: string;
  estActif?: boolean;
  creeLe?: Moment;
  creePar?: string;
  modifLe?: Moment;
  modifPar?: string;
  partenaires?: IPartenaireMySuffix[];
  categorieId?: number;
  reductionId?: number;
  fournisseurId?: number;
  compositionId?: number;
  stockId?: number;
  ventes?: IVenteMySuffix[];
  mouvementStocks?: IMouvementStockMySuffix[];
}

export class ArticleMySuffix implements IArticleMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public libelle?: string,
    public description?: string,
    public prixDeVente?: number,
    public prixDeRevient?: number,
    public margeBrute?: number,
    public estCompose?: boolean,
    public uniteVente?: UniteVente,
    public pourcentageTva?: number,
    public codeBarre?: string,
    public estActif?: boolean,
    public creeLe?: Moment,
    public creePar?: string,
    public modifLe?: Moment,
    public modifPar?: string,
    public partenaires?: IPartenaireMySuffix[],
    public categorieId?: number,
    public reductionId?: number,
    public fournisseurId?: number,
    public compositionId?: number,
    public stockId?: number,
    public ventes?: IVenteMySuffix[],
    public mouvementStocks?: IMouvementStockMySuffix[]
  ) {
    this.estCompose = this.estCompose || false;
    this.estActif = this.estActif || false;
  }
}
