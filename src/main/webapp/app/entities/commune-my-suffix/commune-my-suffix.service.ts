import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICommuneMySuffix } from 'app/shared/model/commune-my-suffix.model';

type EntityResponseType = HttpResponse<ICommuneMySuffix>;
type EntityArrayResponseType = HttpResponse<ICommuneMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CommuneMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/communes';

  constructor(protected http: HttpClient) {}

  create(commune: ICommuneMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commune);
    return this.http
      .post<ICommuneMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(commune: ICommuneMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commune);
    return this.http
      .put<ICommuneMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICommuneMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommuneMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(commune: ICommuneMySuffix): ICommuneMySuffix {
    const copy: ICommuneMySuffix = Object.assign({}, commune, {
      creeLe: commune.creeLe != null && commune.creeLe.isValid() ? commune.creeLe.toJSON() : null,
      modifLe: commune.modifLe != null && commune.modifLe.isValid() ? commune.modifLe.toJSON() : null
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
      res.body.forEach((commune: ICommuneMySuffix) => {
        commune.creeLe = commune.creeLe != null ? moment(commune.creeLe) : null;
        commune.modifLe = commune.modifLe != null ? moment(commune.modifLe) : null;
      });
    }
    return res;
  }
}
