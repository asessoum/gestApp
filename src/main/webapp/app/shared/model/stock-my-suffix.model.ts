import { Moment } from 'moment';
import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

export interface IStockMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  quantite?: number;
  quantiteMin?: number;
  quantiteMax?: number;
  dateModification?: Moment;
  articles?: IArticleMySuffix[];
}

export class StockMySuffix implements IStockMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public quantite?: number,
    public quantiteMin?: number,
    public quantiteMax?: number,
    public dateModification?: Moment,
    public articles?: IArticleMySuffix[]
  ) {}
}
