import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  FactureMySuffixComponent,
  FactureMySuffixDetailComponent,
  FactureMySuffixUpdateComponent,
  FactureMySuffixDeletePopupComponent,
  FactureMySuffixDeleteDialogComponent,
  factureRoute,
  facturePopupRoute
} from './';

const ENTITY_STATES = [...factureRoute, ...facturePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FactureMySuffixComponent,
    FactureMySuffixDetailComponent,
    FactureMySuffixUpdateComponent,
    FactureMySuffixDeleteDialogComponent,
    FactureMySuffixDeletePopupComponent
  ],
  entryComponents: [
    FactureMySuffixComponent,
    FactureMySuffixUpdateComponent,
    FactureMySuffixDeleteDialogComponent,
    FactureMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppFactureMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
