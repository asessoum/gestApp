import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';

type EntityResponseType = HttpResponse<IArticleComposeMySuffix>;
type EntityArrayResponseType = HttpResponse<IArticleComposeMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ArticleComposeMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/article-composes';

  constructor(protected http: HttpClient) {}

  create(articleCompose: IArticleComposeMySuffix): Observable<EntityResponseType> {
    return this.http.post<IArticleComposeMySuffix>(this.resourceUrl, articleCompose, { observe: 'response' });
  }

  update(articleCompose: IArticleComposeMySuffix): Observable<EntityResponseType> {
    return this.http.put<IArticleComposeMySuffix>(this.resourceUrl, articleCompose, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IArticleComposeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArticleComposeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
