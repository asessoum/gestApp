import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from './client-my-suffix.service';
import { ClientMySuffixComponent } from './client-my-suffix.component';
import { ClientMySuffixDetailComponent } from './client-my-suffix-detail.component';
import { ClientMySuffixUpdateComponent } from './client-my-suffix-update.component';
import { ClientMySuffixDeletePopupComponent } from './client-my-suffix-delete-dialog.component';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ClientMySuffixResolve implements Resolve<IClientMySuffix> {
  constructor(private service: ClientMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClientMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ClientMySuffix>) => response.ok),
        map((client: HttpResponse<ClientMySuffix>) => client.body)
      );
    }
    return of(new ClientMySuffix());
  }
}

export const clientRoute: Routes = [
  {
    path: '',
    component: ClientMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClientMySuffixDetailComponent,
    resolve: {
      client: ClientMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClientMySuffixUpdateComponent,
    resolve: {
      client: ClientMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClientMySuffixUpdateComponent,
    resolve: {
      client: ClientMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.client.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const clientPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ClientMySuffixDeletePopupComponent,
    resolve: {
      client: ClientMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.client.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
