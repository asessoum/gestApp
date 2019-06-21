import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';
import { HabilitationMySuffixService } from './habilitation-my-suffix.service';
import { HabilitationMySuffixComponent } from './habilitation-my-suffix.component';
import { HabilitationMySuffixDetailComponent } from './habilitation-my-suffix-detail.component';
import { HabilitationMySuffixUpdateComponent } from './habilitation-my-suffix-update.component';
import { HabilitationMySuffixDeletePopupComponent } from './habilitation-my-suffix-delete-dialog.component';
import { IHabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class HabilitationMySuffixResolve implements Resolve<IHabilitationMySuffix> {
  constructor(private service: HabilitationMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHabilitationMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<HabilitationMySuffix>) => response.ok),
        map((habilitation: HttpResponse<HabilitationMySuffix>) => habilitation.body)
      );
    }
    return of(new HabilitationMySuffix());
  }
}

export const habilitationRoute: Routes = [
  {
    path: '',
    component: HabilitationMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.habilitation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HabilitationMySuffixDetailComponent,
    resolve: {
      habilitation: HabilitationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.habilitation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HabilitationMySuffixUpdateComponent,
    resolve: {
      habilitation: HabilitationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.habilitation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HabilitationMySuffixUpdateComponent,
    resolve: {
      habilitation: HabilitationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.habilitation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const habilitationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: HabilitationMySuffixDeletePopupComponent,
    resolve: {
      habilitation: HabilitationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.habilitation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
