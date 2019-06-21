import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUtilisateurMySuffix } from 'app/shared/model/utilisateur-my-suffix.model';

type EntityResponseType = HttpResponse<IUtilisateurMySuffix>;
type EntityArrayResponseType = HttpResponse<IUtilisateurMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class UtilisateurMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/utilisateurs';

  constructor(protected http: HttpClient) {}

  create(utilisateur: IUtilisateurMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(utilisateur);
    return this.http
      .post<IUtilisateurMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(utilisateur: IUtilisateurMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(utilisateur);
    return this.http
      .put<IUtilisateurMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUtilisateurMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUtilisateurMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(utilisateur: IUtilisateurMySuffix): IUtilisateurMySuffix {
    const copy: IUtilisateurMySuffix = Object.assign({}, utilisateur, {
      dateNaissance: utilisateur.dateNaissance != null && utilisateur.dateNaissance.isValid() ? utilisateur.dateNaissance.toJSON() : null,
      dateMajMdp: utilisateur.dateMajMdp != null && utilisateur.dateMajMdp.isValid() ? utilisateur.dateMajMdp.toJSON() : null,
      creeLe: utilisateur.creeLe != null && utilisateur.creeLe.isValid() ? utilisateur.creeLe.toJSON() : null,
      modifLe: utilisateur.modifLe != null && utilisateur.modifLe.isValid() ? utilisateur.modifLe.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaissance = res.body.dateNaissance != null ? moment(res.body.dateNaissance) : null;
      res.body.dateMajMdp = res.body.dateMajMdp != null ? moment(res.body.dateMajMdp) : null;
      res.body.creeLe = res.body.creeLe != null ? moment(res.body.creeLe) : null;
      res.body.modifLe = res.body.modifLe != null ? moment(res.body.modifLe) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((utilisateur: IUtilisateurMySuffix) => {
        utilisateur.dateNaissance = utilisateur.dateNaissance != null ? moment(utilisateur.dateNaissance) : null;
        utilisateur.dateMajMdp = utilisateur.dateMajMdp != null ? moment(utilisateur.dateMajMdp) : null;
        utilisateur.creeLe = utilisateur.creeLe != null ? moment(utilisateur.creeLe) : null;
        utilisateur.modifLe = utilisateur.modifLe != null ? moment(utilisateur.modifLe) : null;
      });
    }
    return res;
  }
}
