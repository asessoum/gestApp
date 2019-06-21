import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';

type EntityResponseType = HttpResponse<IFournisseurMySuffix>;
type EntityArrayResponseType = HttpResponse<IFournisseurMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class FournisseurMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/fournisseurs';

  constructor(protected http: HttpClient) {}

  create(fournisseur: IFournisseurMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fournisseur);
    return this.http
      .post<IFournisseurMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(fournisseur: IFournisseurMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fournisseur);
    return this.http
      .put<IFournisseurMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFournisseurMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFournisseurMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(fournisseur: IFournisseurMySuffix): IFournisseurMySuffix {
    const copy: IFournisseurMySuffix = Object.assign({}, fournisseur, {
      creeLe: fournisseur.creeLe != null && fournisseur.creeLe.isValid() ? fournisseur.creeLe.toJSON() : null,
      modifLe: fournisseur.modifLe != null && fournisseur.modifLe.isValid() ? fournisseur.modifLe.toJSON() : null
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
      res.body.forEach((fournisseur: IFournisseurMySuffix) => {
        fournisseur.creeLe = fournisseur.creeLe != null ? moment(fournisseur.creeLe) : null;
        fournisseur.modifLe = fournisseur.modifLe != null ? moment(fournisseur.modifLe) : null;
      });
    }
    return res;
  }
}
