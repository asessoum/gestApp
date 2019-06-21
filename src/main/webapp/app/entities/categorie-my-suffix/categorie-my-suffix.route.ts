import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';
import { CategorieMySuffixService } from './categorie-my-suffix.service';
import { CategorieMySuffixComponent } from './categorie-my-suffix.component';
import { CategorieMySuffixDetailComponent } from './categorie-my-suffix-detail.component';
import { CategorieMySuffixUpdateComponent } from './categorie-my-suffix-update.component';
import { CategorieMySuffixDeletePopupComponent } from './categorie-my-suffix-delete-dialog.component';
import { ICategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CategorieMySuffixResolve implements Resolve<ICategorieMySuffix> {
  constructor(private service: CategorieMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategorieMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CategorieMySuffix>) => response.ok),
        map((categorie: HttpResponse<CategorieMySuffix>) => categorie.body)
      );
    }
    return of(new CategorieMySuffix());
  }
}

export const categorieRoute: Routes = [
  {
    path: '',
    component: CategorieMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.categorie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CategorieMySuffixDetailComponent,
    resolve: {
      categorie: CategorieMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.categorie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CategorieMySuffixUpdateComponent,
    resolve: {
      categorie: CategorieMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.categorie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CategorieMySuffixUpdateComponent,
    resolve: {
      categorie: CategorieMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.categorie.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const categoriePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CategorieMySuffixDeletePopupComponent,
    resolve: {
      categorie: CategorieMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.categorie.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
