import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { PartenaireMySuffixService } from './partenaire-my-suffix.service';
import { PartenaireMySuffixComponent } from './partenaire-my-suffix.component';
import { PartenaireMySuffixDetailComponent } from './partenaire-my-suffix-detail.component';
import { PartenaireMySuffixUpdateComponent } from './partenaire-my-suffix-update.component';
import { PartenaireMySuffixDeletePopupComponent } from './partenaire-my-suffix-delete-dialog.component';
import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PartenaireMySuffixResolve implements Resolve<IPartenaireMySuffix> {
  constructor(private service: PartenaireMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPartenaireMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PartenaireMySuffix>) => response.ok),
        map((partenaire: HttpResponse<PartenaireMySuffix>) => partenaire.body)
      );
    }
    return of(new PartenaireMySuffix());
  }
}

export const partenaireRoute: Routes = [
  {
    path: '',
    component: PartenaireMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.partenaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PartenaireMySuffixDetailComponent,
    resolve: {
      partenaire: PartenaireMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.partenaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PartenaireMySuffixUpdateComponent,
    resolve: {
      partenaire: PartenaireMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.partenaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PartenaireMySuffixUpdateComponent,
    resolve: {
      partenaire: PartenaireMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.partenaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const partenairePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PartenaireMySuffixDeletePopupComponent,
    resolve: {
      partenaire: PartenaireMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.partenaire.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
