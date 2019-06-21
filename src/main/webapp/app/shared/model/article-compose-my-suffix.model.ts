import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

export interface IArticleComposeMySuffix {
  id?: number;
  techID?: string;
  remoteID?: number;
  nombre?: number;
  articles?: IArticleMySuffix[];
}

export class ArticleComposeMySuffix implements IArticleComposeMySuffix {
  constructor(
    public id?: number,
    public techID?: string,
    public remoteID?: number,
    public nombre?: number,
    public articles?: IArticleMySuffix[]
  ) {}
}
