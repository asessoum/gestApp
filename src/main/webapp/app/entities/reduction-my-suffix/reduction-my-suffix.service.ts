import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';

type EntityResponseType = HttpResponse<IReductionMySuffix>;
type EntityArrayResponseType = HttpResponse<IReductionMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ReductionMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/reductions';

  constructor(protected http: HttpClient) {}

  create(reduction: IReductionMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reduction);
    return this.http
      .post<IReductionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reduction: IReductionMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reduction);
    return this.http
      .put<IReductionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReductionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReductionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reduction: IReductionMySuffix): IReductionMySuffix {
    const copy: IReductionMySuffix = Object.assign({}, reduction, {
      creeLe: reduction.creeLe != null && reduction.creeLe.isValid() ? reduction.creeLe.toJSON() : null,
      modifLe: reduction.modifLe != null && reduction.modifLe.isValid() ? reduction.modifLe.toJSON() : null
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
      res.body.forEach((reduction: IReductionMySuffix) => {
        reduction.creeLe = reduction.creeLe != null ? moment(reduction.creeLe) : null;
        reduction.modifLe = reduction.modifLe != null ? moment(reduction.modifLe) : null;
      });
    }
    return res;
  }
}
