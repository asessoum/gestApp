import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';
import { ArticleComposeMySuffixService } from './article-compose-my-suffix.service';
import { ArticleComposeMySuffixComponent } from './article-compose-my-suffix.component';
import { ArticleComposeMySuffixDetailComponent } from './article-compose-my-suffix-detail.component';
import { ArticleComposeMySuffixUpdateComponent } from './article-compose-my-suffix-update.component';
import { ArticleComposeMySuffixDeletePopupComponent } from './article-compose-my-suffix-delete-dialog.component';
import { IArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ArticleComposeMySuffixResolve implements Resolve<IArticleComposeMySuffix> {
  constructor(private service: ArticleComposeMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticleComposeMySuffix> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ArticleComposeMySuffix>) => response.ok),
        map((articleCompose: HttpResponse<ArticleComposeMySuffix>) => articleCompose.body)
      );
    }
    return of(new ArticleComposeMySuffix());
  }
}

export const articleComposeRoute: Routes = [
  {
    path: '',
    component: ArticleComposeMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.articleCompose.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ArticleComposeMySuffixDetailComponent,
    resolve: {
      articleCompose: ArticleComposeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.articleCompose.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArticleComposeMySuffixUpdateComponent,
    resolve: {
      articleCompose: ArticleComposeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.articleCompose.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArticleComposeMySuffixUpdateComponent,
    resolve: {
      articleCompose: ArticleComposeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.articleCompose.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const articleComposePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ArticleComposeMySuffixDeletePopupComponent,
    resolve: {
      articleCompose: ArticleComposeMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestApp.articleCompose.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
