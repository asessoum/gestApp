import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';
import { ReductionMySuffixService } from './reduction-my-suffix.service';
import { ReductionMySuffixComponent } from './reduction-my-suffix.component';
import { ReductionMySuffixDetailComponent } from './reduction-my-suffix-detail.component';
import { ReductionMySuffixUpdateComponent } from './reduction-my-suffix-update.component';
import { ReductionMySuffixDeletePopupComponent } from './reduction-my-suffix-delete-dialog.component';
import { IReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ReductionMySuffixResolve implements Resolve<IReductionMySuffix> {
  constructor(private service: ReductionMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReductionMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ReductionMySuffix>) => response.ok),
        map((reduction: HttpResponse<ReductionMySuffix>) => reduction.body)
      );
    }
    return of(new ReductionMySuffix());
  }
}

export const reductionRoute: Routes = [
  {
    path: '',
    component: ReductionMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.reduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReductionMySuffixDetailComponent,
    resolve: {
      reduction: ReductionMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.reduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReductionMySuffixUpdateComponent,
    resolve: {
      reduction: ReductionMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.reduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReductionMySuffixUpdateComponent,
    resolve: {
      reduction: ReductionMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.reduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const reductionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ReductionMySuffixDeletePopupComponent,
    resolve: {
      reduction: ReductionMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.reduction.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
