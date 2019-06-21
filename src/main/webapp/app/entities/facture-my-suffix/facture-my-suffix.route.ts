import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FactureMySuffix } from 'app/shared/model/facture-my-suffix.model';
import { FactureMySuffixService } from './facture-my-suffix.service';
import { FactureMySuffixComponent } from './facture-my-suffix.component';
import { FactureMySuffixDetailComponent } from './facture-my-suffix-detail.component';
import { FactureMySuffixUpdateComponent } from './facture-my-suffix-update.component';
import { FactureMySuffixDeletePopupComponent } from './facture-my-suffix-delete-dialog.component';
import { IFactureMySuffix } from 'app/shared/model/facture-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class FactureMySuffixResolve implements Resolve<IFactureMySuffix> {
  constructor(private service: FactureMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFactureMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FactureMySuffix>) => response.ok),
        map((facture: HttpResponse<FactureMySuffix>) => facture.body)
      );
    }
    return of(new FactureMySuffix());
  }
}

export const factureRoute: Routes = [
  {
    path: '',
    component: FactureMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.facture.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FactureMySuffixDetailComponent,
    resolve: {
      facture: FactureMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.facture.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FactureMySuffixUpdateComponent,
    resolve: {
      facture: FactureMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.facture.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FactureMySuffixUpdateComponent,
    resolve: {
      facture: FactureMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.facture.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const facturePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FactureMySuffixDeletePopupComponent,
    resolve: {
      facture: FactureMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.facture.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
