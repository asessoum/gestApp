import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  LangueMySuffixComponent,
  LangueMySuffixDetailComponent,
  LangueMySuffixUpdateComponent,
  LangueMySuffixDeletePopupComponent,
  LangueMySuffixDeleteDialogComponent,
  langueRoute,
  languePopupRoute
} from './';

const ENTITY_STATES = [...langueRoute, ...languePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LangueMySuffixComponent,
    LangueMySuffixDetailComponent,
    LangueMySuffixUpdateComponent,
    LangueMySuffixDeleteDialogComponent,
    LangueMySuffixDeletePopupComponent
  ],
  entryComponents: [
    LangueMySuffixComponent,
    LangueMySuffixUpdateComponent,
    LangueMySuffixDeleteDialogComponent,
    LangueMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppLangueMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
