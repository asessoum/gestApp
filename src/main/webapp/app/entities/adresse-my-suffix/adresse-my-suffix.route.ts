import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';
import { AdresseMySuffixService } from './adresse-my-suffix.service';
import { AdresseMySuffixComponent } from './adresse-my-suffix.component';
import { AdresseMySuffixDetailComponent } from './adresse-my-suffix-detail.component';
import { AdresseMySuffixUpdateComponent } from './adresse-my-suffix-update.component';
import { AdresseMySuffixDeletePopupComponent } from './adresse-my-suffix-delete-dialog.component';
import { IAdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class AdresseMySuffixResolve implements Resolve<IAdresseMySuffix> {
  constructor(private service: AdresseMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAdresseMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AdresseMySuffix>) => response.ok),
        map((adresse: HttpResponse<AdresseMySuffix>) => adresse.body)
      );
    }
    return of(new AdresseMySuffix());
  }
}

export const adresseRoute: Routes = [
  {
    path: '',
    component: AdresseMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.adresse.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdresseMySuffixDetailComponent,
    resolve: {
      adresse: AdresseMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.adresse.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdresseMySuffixUpdateComponent,
    resolve: {
      adresse: AdresseMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.adresse.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdresseMySuffixUpdateComponent,
    resolve: {
      adresse: AdresseMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.adresse.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const adressePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AdresseMySuffixDeletePopupComponent,
    resolve: {
      adresse: AdresseMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.adresse.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
