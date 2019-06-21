import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFactureMySuffix } from 'app/shared/model/facture-my-suffix.model';

type EntityResponseType = HttpResponse<IFactureMySuffix>;
type EntityArrayResponseType = HttpResponse<IFactureMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class FactureMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/factures';

  constructor(protected http: HttpClient) {}

  create(facture: IFactureMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(facture);
    return this.http
      .post<IFactureMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(facture: IFactureMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(facture);
    return this.http
      .put<IFactureMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFactureMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFactureMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(facture: IFactureMySuffix): IFactureMySuffix {
    const copy: IFactureMySuffix = Object.assign({}, facture, {
      creeLe: facture.creeLe != null && facture.creeLe.isValid() ? facture.creeLe.toJSON() : null,
      modifLe: facture.modifLe != null && facture.modifLe.isValid() ? facture.modifLe.toJSON() : null
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
      res.body.forEach((facture: IFactureMySuffix) => {
        facture.creeLe = facture.creeLe != null ? moment(facture.creeLe) : null;
        facture.modifLe = facture.modifLe != null ? moment(facture.modifLe) : null;
      });
    }
    return res;
  }
}
