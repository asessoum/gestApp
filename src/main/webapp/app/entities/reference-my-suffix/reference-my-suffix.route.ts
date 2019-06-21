import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReferenceMySuffix } from 'app/shared/model/reference-my-suffix.model';
import { ReferenceMySuffixService } from './reference-my-suffix.service';
import { ReferenceMySuffixComponent } from './reference-my-suffix.component';
import { ReferenceMySuffixDetailComponent } from './reference-my-suffix-detail.component';
import { ReferenceMySuffixUpdateComponent } from './reference-my-suffix-update.component';
import { ReferenceMySuffixDeletePopupComponent } from './reference-my-suffix-delete-dialog.component';
import { IReferenceMySuffix } from 'app/shared/model/reference-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ReferenceMySuffixResolve implements Resolve<IReferenceMySuffix> {
  constructor(private service: ReferenceMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReferenceMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ReferenceMySuffix>) => response.ok),
        map((reference: HttpResponse<ReferenceMySuffix>) => reference.body)
      );
    }
    return of(new ReferenceMySuffix());
  }
}

export const referenceRoute: Routes = [
  {
    path: '',
    component: ReferenceMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.reference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReferenceMySuffixDetailComponent,
    resolve: {
      reference: ReferenceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.reference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReferenceMySuffixUpdateComponent,
    resolve: {
      reference: ReferenceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.reference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReferenceMySuffixUpdateComponent,
    resolve: {
      reference: ReferenceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.reference.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const referencePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ReferenceMySuffixDeletePopupComponent,
    resolve: {
      reference: ReferenceMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.reference.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
