import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';
import { MouvementStockMySuffixService } from './mouvement-stock-my-suffix.service';
import { MouvementStockMySuffixComponent } from './mouvement-stock-my-suffix.component';
import { MouvementStockMySuffixDetailComponent } from './mouvement-stock-my-suffix-detail.component';
import { MouvementStockMySuffixUpdateComponent } from './mouvement-stock-my-suffix-update.component';
import { MouvementStockMySuffixDeletePopupComponent } from './mouvement-stock-my-suffix-delete-dialog.component';
import { IMouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class MouvementStockMySuffixResolve implements Resolve<IMouvementStockMySuffix> {
  constructor(private service: MouvementStockMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMouvementStockMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MouvementStockMySuffix>) => response.ok),
        map((mouvementStock: HttpResponse<MouvementStockMySuffix>) => mouvementStock.body)
      );
    }
    return of(new MouvementStockMySuffix());
  }
}

export const mouvementStockRoute: Routes = [
  {
    path: '',
    component: MouvementStockMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.mouvementStock.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MouvementStockMySuffixDetailComponent,
    resolve: {
      mouvementStock: MouvementStockMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.mouvementStock.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MouvementStockMySuffixUpdateComponent,
    resolve: {
      mouvementStock: MouvementStockMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.mouvementStock.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MouvementStockMySuffixUpdateComponent,
    resolve: {
      mouvementStock: MouvementStockMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.mouvementStock.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mouvementStockPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MouvementStockMySuffixDeletePopupComponent,
    resolve: {
      mouvementStock: MouvementStockMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.mouvementStock.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
