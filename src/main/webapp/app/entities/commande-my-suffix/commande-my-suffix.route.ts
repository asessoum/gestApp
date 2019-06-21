import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CommandeMySuffix } from 'app/shared/model/commande-my-suffix.model';
import { CommandeMySuffixService } from './commande-my-suffix.service';
import { CommandeMySuffixComponent } from './commande-my-suffix.component';
import { CommandeMySuffixDetailComponent } from './commande-my-suffix-detail.component';
import { CommandeMySuffixUpdateComponent } from './commande-my-suffix-update.component';
import { CommandeMySuffixDeletePopupComponent } from './commande-my-suffix-delete-dialog.component';
import { ICommandeMySuffix } from 'app/shared/model/commande-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CommandeMySuffixResolve implements Resolve<ICommandeMySuffix> {
  constructor(private service: CommandeMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICommandeMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CommandeMySuffix>) => response.ok),
        map((commande: HttpResponse<CommandeMySuffix>) => commande.body)
      );
    }
    return of(new CommandeMySuffix());
  }
}

export const commandeRoute: Routes = [
  {
    path: '',
    component: CommandeMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.commande.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CommandeMySuffixDetailComponent,
    resolve: {
      commande: CommandeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.commande.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CommandeMySuffixUpdateComponent,
    resolve: {
      commande: CommandeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.commande.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CommandeMySuffixUpdateComponent,
    resolve: {
      commande: CommandeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.commande.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const commandePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CommandeMySuffixDeletePopupComponent,
    resolve: {
      commande: CommandeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.commande.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
