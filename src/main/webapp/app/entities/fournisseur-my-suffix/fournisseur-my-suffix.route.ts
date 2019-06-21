import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';
import { FournisseurMySuffixService } from './fournisseur-my-suffix.service';
import { FournisseurMySuffixComponent } from './fournisseur-my-suffix.component';
import { FournisseurMySuffixDetailComponent } from './fournisseur-my-suffix-detail.component';
import { FournisseurMySuffixUpdateComponent } from './fournisseur-my-suffix-update.component';
import { FournisseurMySuffixDeletePopupComponent } from './fournisseur-my-suffix-delete-dialog.component';
import { IFournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class FournisseurMySuffixResolve implements Resolve<IFournisseurMySuffix> {
  constructor(private service: FournisseurMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFournisseurMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FournisseurMySuffix>) => response.ok),
        map((fournisseur: HttpResponse<FournisseurMySuffix>) => fournisseur.body)
      );
    }
    return of(new FournisseurMySuffix());
  }
}

export const fournisseurRoute: Routes = [
  {
    path: '',
    component: FournisseurMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.fournisseur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FournisseurMySuffixDetailComponent,
    resolve: {
      fournisseur: FournisseurMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.fournisseur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FournisseurMySuffixUpdateComponent,
    resolve: {
      fournisseur: FournisseurMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.fournisseur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FournisseurMySuffixUpdateComponent,
    resolve: {
      fournisseur: FournisseurMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.fournisseur.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const fournisseurPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FournisseurMySuffixDeletePopupComponent,
    resolve: {
      fournisseur: FournisseurMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.fournisseur.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
