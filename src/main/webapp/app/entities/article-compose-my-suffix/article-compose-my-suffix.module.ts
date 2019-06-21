import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  ArticleComposeMySuffixComponent,
  ArticleComposeMySuffixDetailComponent,
  ArticleComposeMySuffixUpdateComponent,
  ArticleComposeMySuffixDeletePopupComponent,
  ArticleComposeMySuffixDeleteDialogComponent,
  articleComposeRoute,
  articleComposePopupRoute
} from './';

const ENTITY_STATES = [...articleComposeRoute, ...articleComposePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ArticleComposeMySuffixComponent,
    ArticleComposeMySuffixDetailComponent,
    ArticleComposeMySuffixUpdateComponent,
    ArticleComposeMySuffixDeleteDialogComponent,
    ArticleComposeMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ArticleComposeMySuffixComponent,
    ArticleComposeMySuffixUpdateComponent,
    ArticleComposeMySuffixDeleteDialogComponent,
    ArticleComposeMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppArticleComposeMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
