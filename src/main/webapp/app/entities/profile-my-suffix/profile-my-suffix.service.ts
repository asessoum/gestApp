import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';

type EntityResponseType = HttpResponse<IProfileMySuffix>;
type EntityArrayResponseType = HttpResponse<IProfileMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ProfileMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/profiles';

  constructor(protected http: HttpClient) {}

  create(profile: IProfileMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profile);
    return this.http
      .post<IProfileMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(profile: IProfileMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profile);
    return this.http
      .put<IProfileMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfileMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfileMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(profile: IProfileMySuffix): IProfileMySuffix {
    const copy: IProfileMySuffix = Object.assign({}, profile, {
      creeLe: profile.creeLe != null && profile.creeLe.isValid() ? profile.creeLe.toJSON() : null,
      modifLe: profile.modifLe != null && profile.modifLe.isValid() ? profile.modifLe.toJSON() : null
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
      res.body.forEach((profile: IProfileMySuffix) => {
        profile.creeLe = profile.creeLe != null ? moment(profile.creeLe) : null;
        profile.modifLe = profile.modifLe != null ? moment(profile.modifLe) : null;
      });
    }
    return res;
  }
}
