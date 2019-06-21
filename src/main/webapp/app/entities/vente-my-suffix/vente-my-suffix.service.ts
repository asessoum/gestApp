import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVenteMySuffix } from 'app/shared/model/vente-my-suffix.model';

type EntityResponseType = HttpResponse<IVenteMySuffix>;
type EntityArrayResponseType = HttpResponse<IVenteMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class VenteMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/ventes';

  constructor(protected http: HttpClient) {}

  create(vente: IVenteMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vente);
    return this.http
      .post<IVenteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vente: IVenteMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vente);
    return this.http
      .put<IVenteMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVenteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVenteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(vente: IVenteMySuffix): IVenteMySuffix {
    const copy: IVenteMySuffix = Object.assign({}, vente, {
      creeLe: vente.creeLe != null && vente.creeLe.isValid() ? vente.creeLe.toJSON() : null,
      modifLe: vente.modifLe != null && vente.modifLe.isValid() ? vente.modifLe.toJSON() : null
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
      res.body.forEach((vente: IVenteMySuffix) => {
        vente.creeLe = vente.creeLe != null ? moment(vente.creeLe) : null;
        vente.modifLe = vente.modifLe != null ? moment(vente.modifLe) : null;
      });
    }
    return res;
  }
}
