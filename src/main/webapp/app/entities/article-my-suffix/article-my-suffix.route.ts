import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArticleMySuffix } from 'app/shared/model/article-my-suffix.model';
import { ArticleMySuffixService } from './article-my-suffix.service';
import { ArticleMySuffixComponent } from './article-my-suffix.component';
import { ArticleMySuffixDetailComponent } from './article-my-suffix-detail.component';
import { ArticleMySuffixUpdateComponent } from './article-my-suffix-update.component';
import { ArticleMySuffixDeletePopupComponent } from './article-my-suffix-delete-dialog.component';
import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ArticleMySuffixResolve implements Resolve<IArticleMySuffix> {
  constructor(private service: ArticleMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticleMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ArticleMySuffix>) => response.ok),
        map((article: HttpResponse<ArticleMySuffix>) => article.body)
      );
    }
    return of(new ArticleMySuffix());
  }
}

export const articleRoute: Routes = [
  {
    path: '',
    component: ArticleMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ArticleMySuffixDetailComponent,
    resolve: {
      article: ArticleMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArticleMySuffixUpdateComponent,
    resolve: {
      article: ArticleMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArticleMySuffixUpdateComponent,
    resolve: {
      article: ArticleMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const articlePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ArticleMySuffixDeletePopupComponent,
    resolve: {
      article: ArticleMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.article.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
