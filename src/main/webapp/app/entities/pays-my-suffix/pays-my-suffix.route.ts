import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PaysMySuffix } from 'app/shared/model/pays-my-suffix.model';
import { PaysMySuffixService } from './pays-my-suffix.service';
import { PaysMySuffixComponent } from './pays-my-suffix.component';
import { PaysMySuffixDetailComponent } from './pays-my-suffix-detail.component';
import { PaysMySuffixUpdateComponent } from './pays-my-suffix-update.component';
import { PaysMySuffixDeletePopupComponent } from './pays-my-suffix-delete-dialog.component';
import { IPaysMySuffix } from 'app/shared/model/pays-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PaysMySuffixResolve implements Resolve<IPaysMySuffix> {
  constructor(private service: PaysMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaysMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PaysMySuffix>) => response.ok),
        map((pays: HttpResponse<PaysMySuffix>) => pays.body)
      );
    }
    return of(new PaysMySuffix());
  }
}

export const paysRoute: Routes = [
  {
    path: '',
    component: PaysMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.pays.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PaysMySuffixDetailComponent,
    resolve: {
      pays: PaysMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.pays.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PaysMySuffixUpdateComponent,
    resolve: {
      pays: PaysMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.pays.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PaysMySuffixUpdateComponent,
    resolve: {
      pays: PaysMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.pays.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const paysPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PaysMySuffixDeletePopupComponent,
    resolve: {
      pays: PaysMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.pays.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
