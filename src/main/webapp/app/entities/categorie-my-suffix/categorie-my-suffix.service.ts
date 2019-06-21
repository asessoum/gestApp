import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';

type EntityResponseType = HttpResponse<ICategorieMySuffix>;
type EntityArrayResponseType = HttpResponse<ICategorieMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CategorieMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/categories';

  constructor(protected http: HttpClient) {}

  create(categorie: ICategorieMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(categorie);
    return this.http
      .post<ICategorieMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(categorie: ICategorieMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(categorie);
    return this.http
      .put<ICategorieMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICategorieMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICategorieMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(categorie: ICategorieMySuffix): ICategorieMySuffix {
    const copy: ICategorieMySuffix = Object.assign({}, categorie, {
      creeLe: categorie.creeLe != null && categorie.creeLe.isValid() ? categorie.creeLe.toJSON() : null,
      modifLe: categorie.modifLe != null && categorie.modifLe.isValid() ? categorie.modifLe.toJSON() : null
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
      res.body.forEach((categorie: ICategorieMySuffix) => {
        categorie.creeLe = categorie.creeLe != null ? moment(categorie.creeLe) : null;
        categorie.modifLe = categorie.modifLe != null ? moment(categorie.modifLe) : null;
      });
    }
    return res;
  }
}
