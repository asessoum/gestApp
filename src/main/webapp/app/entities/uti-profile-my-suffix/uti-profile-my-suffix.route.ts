import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';
import { UtiProfileMySuffixService } from './uti-profile-my-suffix.service';
import { UtiProfileMySuffixComponent } from './uti-profile-my-suffix.component';
import { UtiProfileMySuffixDetailComponent } from './uti-profile-my-suffix-detail.component';
import { UtiProfileMySuffixUpdateComponent } from './uti-profile-my-suffix-update.component';
import { UtiProfileMySuffixDeletePopupComponent } from './uti-profile-my-suffix-delete-dialog.component';
import { IUtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class UtiProfileMySuffixResolve implements Resolve<IUtiProfileMySuffix> {
  constructor(private service: UtiProfileMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUtiProfileMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<UtiProfileMySuffix>) => response.ok),
        map((utiProfile: HttpResponse<UtiProfileMySuffix>) => utiProfile.body)
      );
    }
    return of(new UtiProfileMySuffix());
  }
}

export const utiProfileRoute: Routes = [
  {
    path: '',
    component: UtiProfileMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.utiProfile.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UtiProfileMySuffixDetailComponent,
    resolve: {
      utiProfile: UtiProfileMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.utiProfile.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UtiProfileMySuffixUpdateComponent,
    resolve: {
      utiProfile: UtiProfileMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.utiProfile.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UtiProfileMySuffixUpdateComponent,
    resolve: {
      utiProfile: UtiProfileMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.utiProfile.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const utiProfilePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UtiProfileMySuffixDeletePopupComponent,
    resolve: {
      utiProfile: UtiProfileMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.utiProfile.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
