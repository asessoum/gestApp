import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';

type EntityResponseType = HttpResponse<ILangueMySuffix>;
type EntityArrayResponseType = HttpResponse<ILangueMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class LangueMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/langues';

  constructor(protected http: HttpClient) {}

  create(langue: ILangueMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(langue);
    return this.http
      .post<ILangueMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(langue: ILangueMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(langue);
    return this.http
      .put<ILangueMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILangueMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILangueMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(langue: ILangueMySuffix): ILangueMySuffix {
    const copy: ILangueMySuffix = Object.assign({}, langue, {
      creeLe: langue.creeLe != null && langue.creeLe.isValid() ? langue.creeLe.toJSON() : null,
      modifLe: langue.modifLe != null && langue.modifLe.isValid() ? langue.modifLe.toJSON() : null
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
      res.body.forEach((langue: ILangueMySuffix) => {
        langue.creeLe = langue.creeLe != null ? moment(langue.creeLe) : null;
        langue.modifLe = langue.modifLe != null ? moment(langue.modifLe) : null;
      });
    }
    return res;
  }
}
