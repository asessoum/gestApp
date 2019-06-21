import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  ArticleMySuffixComponent,
  ArticleMySuffixDetailComponent,
  ArticleMySuffixUpdateComponent,
  ArticleMySuffixDeletePopupComponent,
  ArticleMySuffixDeleteDialogComponent,
  articleRoute,
  articlePopupRoute
} from './';

const ENTITY_STATES = [...articleRoute, ...articlePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ArticleMySuffixComponent,
    ArticleMySuffixDetailComponent,
    ArticleMySuffixUpdateComponent,
    ArticleMySuffixDeleteDialogComponent,
    ArticleMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ArticleMySuffixComponent,
    ArticleMySuffixUpdateComponent,
    ArticleMySuffixDeleteDialogComponent,
    ArticleMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppArticleMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
