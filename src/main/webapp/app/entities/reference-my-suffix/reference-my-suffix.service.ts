import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReferenceMySuffix } from 'app/shared/model/reference-my-suffix.model';

type EntityResponseType = HttpResponse<IReferenceMySuffix>;
type EntityArrayResponseType = HttpResponse<IReferenceMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ReferenceMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/references';

  constructor(protected http: HttpClient) {}

  create(reference: IReferenceMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reference);
    return this.http
      .post<IReferenceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reference: IReferenceMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reference);
    return this.http
      .put<IReferenceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReferenceMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReferenceMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reference: IReferenceMySuffix): IReferenceMySuffix {
    const copy: IReferenceMySuffix = Object.assign({}, reference, {
      creeLe: reference.creeLe != null && reference.creeLe.isValid() ? reference.creeLe.toJSON() : null,
      modifLe: reference.modifLe != null && reference.modifLe.isValid() ? reference.modifLe.toJSON() : null
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
      res.body.forEach((reference: IReferenceMySuffix) => {
        reference.creeLe = reference.creeLe != null ? moment(reference.creeLe) : null;
        reference.modifLe = reference.modifLe != null ? moment(reference.modifLe) : null;
      });
    }
    return res;
  }
}
