import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStockMySuffix } from 'app/shared/model/stock-my-suffix.model';

type EntityResponseType = HttpResponse<IStockMySuffix>;
type EntityArrayResponseType = HttpResponse<IStockMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class StockMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/stocks';

  constructor(protected http: HttpClient) {}

  create(stock: IStockMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stock);
    return this.http
      .post<IStockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(stock: IStockMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stock);
    return this.http
      .put<IStockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStockMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStockMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(stock: IStockMySuffix): IStockMySuffix {
    const copy: IStockMySuffix = Object.assign({}, stock, {
      dateModification: stock.dateModification != null && stock.dateModification.isValid() ? stock.dateModification.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateModification = res.body.dateModification != null ? moment(res.body.dateModification) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((stock: IStockMySuffix) => {
        stock.dateModification = stock.dateModification != null ? moment(stock.dateModification) : null;
      });
    }
    return res;
  }
}
