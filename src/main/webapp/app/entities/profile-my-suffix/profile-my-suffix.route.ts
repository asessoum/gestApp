import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';
import { ProfileMySuffixService } from './profile-my-suffix.service';
import { ProfileMySuffixComponent } from './profile-my-suffix.component';
import { ProfileMySuffixDetailComponent } from './profile-my-suffix-detail.component';
import { ProfileMySuffixUpdateComponent } from './profile-my-suffix-update.component';
import { ProfileMySuffixDeletePopupComponent } from './profile-my-suffix-delete-dialog.component';
import { IProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ProfileMySuffixResolve implements Resolve<IProfileMySuffix> {
  constructor(private service: ProfileMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProfileMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProfileMySuffix>) => response.ok),
        map((profile: HttpResponse<ProfileMySuffix>) => profile.body)
      );
    }
    return of(new ProfileMySuffix());
  }
}

export const profileRoute: Routes = [
  {
    path: '',
    component: ProfileMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.profile.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProfileMySuffixDetailComponent,
    resolve: {
      profile: ProfileMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.profile.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProfileMySuffixUpdateComponent,
    resolve: {
      profile: ProfileMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.profile.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProfileMySuffixUpdateComponent,
    resolve: {
      profile: ProfileMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.profile.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const profilePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProfileMySuffixDeletePopupComponent,
    resolve: {
      profile: ProfileMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.profile.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
