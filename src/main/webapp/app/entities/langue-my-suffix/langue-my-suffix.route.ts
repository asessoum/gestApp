import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LangueMySuffix } from 'app/shared/model/langue-my-suffix.model';
import { LangueMySuffixService } from './langue-my-suffix.service';
import { LangueMySuffixComponent } from './langue-my-suffix.component';
import { LangueMySuffixDetailComponent } from './langue-my-suffix-detail.component';
import { LangueMySuffixUpdateComponent } from './langue-my-suffix-update.component';
import { LangueMySuffixDeletePopupComponent } from './langue-my-suffix-delete-dialog.component';
import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class LangueMySuffixResolve implements Resolve<ILangueMySuffix> {
  constructor(private service: LangueMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILangueMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LangueMySuffix>) => response.ok),
        map((langue: HttpResponse<LangueMySuffix>) => langue.body)
      );
    }
    return of(new LangueMySuffix());
  }
}

export const langueRoute: Routes = [
  {
    path: '',
    component: LangueMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.langue.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LangueMySuffixDetailComponent,
    resolve: {
      langue: LangueMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.langue.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LangueMySuffixUpdateComponent,
    resolve: {
      langue: LangueMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.langue.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LangueMySuffixUpdateComponent,
    resolve: {
      langue: LangueMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.langue.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const languePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LangueMySuffixDeletePopupComponent,
    resolve: {
      langue: LangueMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.langue.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
