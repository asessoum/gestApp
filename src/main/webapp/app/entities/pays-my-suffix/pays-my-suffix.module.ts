import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  PaysMySuffixComponent,
  PaysMySuffixDetailComponent,
  PaysMySuffixUpdateComponent,
  PaysMySuffixDeletePopupComponent,
  PaysMySuffixDeleteDialogComponent,
  paysRoute,
  paysPopupRoute
} from './';

const ENTITY_STATES = [...paysRoute, ...paysPopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PaysMySuffixComponent,
    PaysMySuffixDetailComponent,
    PaysMySuffixUpdateComponent,
    PaysMySuffixDeleteDialogComponent,
    PaysMySuffixDeletePopupComponent
  ],
  entryComponents: [
    PaysMySuffixComponent,
    PaysMySuffixUpdateComponent,
    PaysMySuffixDeleteDialogComponent,
    PaysMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppPaysMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
