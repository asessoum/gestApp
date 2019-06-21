import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VenteMySuffix } from 'app/shared/model/vente-my-suffix.model';
import { VenteMySuffixService } from './vente-my-suffix.service';
import { VenteMySuffixComponent } from './vente-my-suffix.component';
import { VenteMySuffixDetailComponent } from './vente-my-suffix-detail.component';
import { VenteMySuffixUpdateComponent } from './vente-my-suffix-update.component';
import { VenteMySuffixDeletePopupComponent } from './vente-my-suffix-delete-dialog.component';
import { IVenteMySuffix } from 'app/shared/model/vente-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class VenteMySuffixResolve implements Resolve<IVenteMySuffix> {
  constructor(private service: VenteMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVenteMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<VenteMySuffix>) => response.ok),
        map((vente: HttpResponse<VenteMySuffix>) => vente.body)
      );
    }
    return of(new VenteMySuffix());
  }
}

export const venteRoute: Routes = [
  {
    path: '',
    component: VenteMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.vente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VenteMySuffixDetailComponent,
    resolve: {
      vente: VenteMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.vente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VenteMySuffixUpdateComponent,
    resolve: {
      vente: VenteMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.vente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VenteMySuffixUpdateComponent,
    resolve: {
      vente: VenteMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.vente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ventePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VenteMySuffixDeletePopupComponent,
    resolve: {
      vente: VenteMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.vente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
