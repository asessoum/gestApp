import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';

type EntityResponseType = HttpResponse<IAdresseMySuffix>;
type EntityArrayResponseType = HttpResponse<IAdresseMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class AdresseMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/adresses';

  constructor(protected http: HttpClient) {}

  create(adresse: IAdresseMySuffix): Observable<EntityResponseType> {
    return this.http.post<IAdresseMySuffix>(this.resourceUrl, adresse, { observe: 'response' });
  }

  update(adresse: IAdresseMySuffix): Observable<EntityResponseType> {
    return this.http.put<IAdresseMySuffix>(this.resourceUrl, adresse, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAdresseMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdresseMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
