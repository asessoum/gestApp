import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  HabilitationMySuffixComponent,
  HabilitationMySuffixDetailComponent,
  HabilitationMySuffixUpdateComponent,
  HabilitationMySuffixDeletePopupComponent,
  HabilitationMySuffixDeleteDialogComponent,
  habilitationRoute,
  habilitationPopupRoute
} from './';

const ENTITY_STATES = [...habilitationRoute, ...habilitationPopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    HabilitationMySuffixComponent,
    HabilitationMySuffixDetailComponent,
    HabilitationMySuffixUpdateComponent,
    HabilitationMySuffixDeleteDialogComponent,
    HabilitationMySuffixDeletePopupComponent
  ],
  entryComponents: [
    HabilitationMySuffixComponent,
    HabilitationMySuffixUpdateComponent,
    HabilitationMySuffixDeleteDialogComponent,
    HabilitationMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppHabilitationMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
