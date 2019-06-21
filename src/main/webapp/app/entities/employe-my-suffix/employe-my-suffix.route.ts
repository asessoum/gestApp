import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';
import { EmployeMySuffixService } from './employe-my-suffix.service';
import { EmployeMySuffixComponent } from './employe-my-suffix.component';
import { EmployeMySuffixDetailComponent } from './employe-my-suffix-detail.component';
import { EmployeMySuffixUpdateComponent } from './employe-my-suffix-update.component';
import { EmployeMySuffixDeletePopupComponent } from './employe-my-suffix-delete-dialog.component';
import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class EmployeMySuffixResolve implements Resolve<IEmployeMySuffix> {
  constructor(private service: EmployeMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployeMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EmployeMySuffix>) => response.ok),
        map((employe: HttpResponse<EmployeMySuffix>) => employe.body)
      );
    }
    return of(new EmployeMySuffix());
  }
}

export const employeRoute: Routes = [
  {
    path: '',
    component: EmployeMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.employe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmployeMySuffixDetailComponent,
    resolve: {
      employe: EmployeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.employe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeMySuffixUpdateComponent,
    resolve: {
      employe: EmployeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.employe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmployeMySuffixUpdateComponent,
    resolve: {
      employe: EmployeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.employe.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const employePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EmployeMySuffixDeletePopupComponent,
    resolve: {
      employe: EmployeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.employe.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
