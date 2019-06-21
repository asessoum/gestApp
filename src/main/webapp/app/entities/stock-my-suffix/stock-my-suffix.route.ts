import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StockMySuffix } from 'app/shared/model/stock-my-suffix.model';
import { StockMySuffixService } from './stock-my-suffix.service';
import { StockMySuffixComponent } from './stock-my-suffix.component';
import { StockMySuffixDetailComponent } from './stock-my-suffix-detail.component';
import { StockMySuffixUpdateComponent } from './stock-my-suffix-update.component';
import { StockMySuffixDeletePopupComponent } from './stock-my-suffix-delete-dialog.component';
import { IStockMySuffix } from 'app/shared/model/stock-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class StockMySuffixResolve implements Resolve<IStockMySuffix> {
  constructor(private service: StockMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStockMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<StockMySuffix>) => response.ok),
        map((stock: HttpResponse<StockMySuffix>) => stock.body)
      );
    }
    return of(new StockMySuffix());
  }
}

export const stockRoute: Routes = [
  {
    path: '',
    component: StockMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.stock.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StockMySuffixDetailComponent,
    resolve: {
      stock: StockMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.stock.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StockMySuffixUpdateComponent,
    resolve: {
      stock: StockMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.stock.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StockMySuffixUpdateComponent,
    resolve: {
      stock: StockMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.stock.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const stockPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StockMySuffixDeletePopupComponent,
    resolve: {
      stock: StockMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.stock.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
