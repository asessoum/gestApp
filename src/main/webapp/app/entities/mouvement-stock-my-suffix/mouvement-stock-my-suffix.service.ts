import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';

type EntityResponseType = HttpResponse<IMouvementStockMySuffix>;
type EntityArrayResponseType = HttpResponse<IMouvementStockMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class MouvementStockMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/mouvement-stocks';

  constructor(protected http: HttpClient) {}

  create(mouvementStock: IMouvementStockMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mouvementStock);
    return this.http
      .post<IMouvementStockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(mouvementStock: IMouvementStockMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mouvementStock);
    return this.http
      .put<IMouvementStockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMouvementStockMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMouvementStockMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(mouvementStock: IMouvementStockMySuffix): IMouvementStockMySuffix {
    const copy: IMouvementStockMySuffix = Object.assign({}, mouvementStock, {
      creeLe: mouvementStock.creeLe != null && mouvementStock.creeLe.isValid() ? mouvementStock.creeLe.toJSON() : null,
      modifLe: mouvementStock.modifLe != null && mouvementStock.modifLe.isValid() ? mouvementStock.modifLe.toJSON() : null
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
      res.body.forEach((mouvementStock: IMouvementStockMySuffix) => {
        mouvementStock.creeLe = mouvementStock.creeLe != null ? moment(mouvementStock.creeLe) : null;
        mouvementStock.modifLe = mouvementStock.modifLe != null ? moment(mouvementStock.modifLe) : null;
      });
    }
    return res;
  }
}
