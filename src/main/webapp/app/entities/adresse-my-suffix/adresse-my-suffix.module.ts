import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  AdresseMySuffixComponent,
  AdresseMySuffixDetailComponent,
  AdresseMySuffixUpdateComponent,
  AdresseMySuffixDeletePopupComponent,
  AdresseMySuffixDeleteDialogComponent,
  adresseRoute,
  adressePopupRoute
} from './';

const ENTITY_STATES = [...adresseRoute, ...adressePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AdresseMySuffixComponent,
    AdresseMySuffixDetailComponent,
    AdresseMySuffixUpdateComponent,
    AdresseMySuffixDeleteDialogComponent,
    AdresseMySuffixDeletePopupComponent
  ],
  entryComponents: [
    AdresseMySuffixComponent,
    AdresseMySuffixUpdateComponent,
    AdresseMySuffixDeleteDialogComponent,
    AdresseMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppAdresseMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
