import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  CommandeMySuffixComponent,
  CommandeMySuffixDetailComponent,
  CommandeMySuffixUpdateComponent,
  CommandeMySuffixDeletePopupComponent,
  CommandeMySuffixDeleteDialogComponent,
  commandeRoute,
  commandePopupRoute
} from './';

const ENTITY_STATES = [...commandeRoute, ...commandePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CommandeMySuffixComponent,
    CommandeMySuffixDetailComponent,
    CommandeMySuffixUpdateComponent,
    CommandeMySuffixDeleteDialogComponent,
    CommandeMySuffixDeletePopupComponent
  ],
  entryComponents: [
    CommandeMySuffixComponent,
    CommandeMySuffixUpdateComponent,
    CommandeMySuffixDeleteDialogComponent,
    CommandeMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppCommandeMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
