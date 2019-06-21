import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPaysMySuffix } from 'app/shared/model/pays-my-suffix.model';

type EntityResponseType = HttpResponse<IPaysMySuffix>;
type EntityArrayResponseType = HttpResponse<IPaysMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PaysMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/pays';

  constructor(protected http: HttpClient) {}

  create(pays: IPaysMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pays);
    return this.http
      .post<IPaysMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pays: IPaysMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pays);
    return this.http
      .put<IPaysMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPaysMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPaysMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(pays: IPaysMySuffix): IPaysMySuffix {
    const copy: IPaysMySuffix = Object.assign({}, pays, {
      creeLe: pays.creeLe != null && pays.creeLe.isValid() ? pays.creeLe.toJSON() : null,
      modifLe: pays.modifLe != null && pays.modifLe.isValid() ? pays.modifLe.toJSON() : null
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
      res.body.forEach((pays: IPaysMySuffix) => {
        pays.creeLe = pays.creeLe != null ? moment(pays.creeLe) : null;
        pays.modifLe = pays.modifLe != null ? moment(pays.modifLe) : null;
      });
    }
    return res;
  }
}
