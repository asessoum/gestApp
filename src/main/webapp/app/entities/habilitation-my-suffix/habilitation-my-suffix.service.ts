import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';

type EntityResponseType = HttpResponse<IHabilitationMySuffix>;
type EntityArrayResponseType = HttpResponse<IHabilitationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class HabilitationMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/habilitations';

  constructor(protected http: HttpClient) {}

  create(habilitation: IHabilitationMySuffix): Observable<EntityResponseType> {
    return this.http.post<IHabilitationMySuffix>(this.resourceUrl, habilitation, { observe: 'response' });
  }

  update(habilitation: IHabilitationMySuffix): Observable<EntityResponseType> {
    return this.http.put<IHabilitationMySuffix>(this.resourceUrl, habilitation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHabilitationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHabilitationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
