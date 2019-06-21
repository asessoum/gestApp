import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

type EntityResponseType = HttpResponse<IArticleMySuffix>;
type EntityArrayResponseType = HttpResponse<IArticleMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ArticleMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/articles';

  constructor(protected http: HttpClient) {}

  create(article: IArticleMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(article);
    return this.http
      .post<IArticleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(article: IArticleMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(article);
    return this.http
      .put<IArticleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IArticleMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IArticleMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(article: IArticleMySuffix): IArticleMySuffix {
    const copy: IArticleMySuffix = Object.assign({}, article, {
      creeLe: article.creeLe != null && article.creeLe.isValid() ? article.creeLe.toJSON() : null,
      modifLe: article.modifLe != null && article.modifLe.isValid() ? article.modifLe.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creeLe = res.body.creeLe != null ? moment(res.body.creeLe) : null;
      res.body.modifLe = res.body.modifLe != null ? moment(res.body.modifLe) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((article: IArticleMySuffix) => {
        article.creeLe = article.creeLe != null ? moment(article.creeLe) : null;
        article.modifLe = article.modifLe != null ? moment(article.modifLe) : null;
      });
    }
    return res;
  }
}
