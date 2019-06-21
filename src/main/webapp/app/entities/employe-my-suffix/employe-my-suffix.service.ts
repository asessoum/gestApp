import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';

type EntityResponseType = HttpResponse<IEmployeMySuffix>;
type EntityArrayResponseType = HttpResponse<IEmployeMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class EmployeMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/employes';

  constructor(protected http: HttpClient) {}

  create(employe: IEmployeMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .post<IEmployeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(employe: IEmployeMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .put<IEmployeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEmployeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmployeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(employe: IEmployeMySuffix): IEmployeMySuffix {
    const copy: IEmployeMySuffix = Object.assign({}, employe, {
      dateCarteUti: employe.dateCarteUti != null && employe.dateCarteUti.isValid() ? employe.dateCarteUti.toJSON() : null,
      creeLe: employe.creeLe != null && employe.creeLe.isValid() ? employe.creeLe.toJSON() : null,
      modifLe: employe.modifLe != null && employe.modifLe.isValid() ? employe.modifLe.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCarteUti = res.body.dateCarteUti != null ? moment(res.body.dateCarteUti) : null;
      res.body.creeLe = res.body.creeLe != null ? moment(res.body.creeLe) : null;
      res.body.modifLe = res.body.modifLe != null ? moment(res.body.modifLe) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((employe: IEmployeMySuffix) => {
        employe.dateCarteUti = employe.dateCarteUti != null ? moment(employe.dateCarteUti) : null;
        employe.creeLe = employe.creeLe != null ? moment(employe.creeLe) : null;
        employe.modifLe = employe.modifLe != null ? moment(employe.modifLe) : null;
      });
    }
    return res;
  }
}
