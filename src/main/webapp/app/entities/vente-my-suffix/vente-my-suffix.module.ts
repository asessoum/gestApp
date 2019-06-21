import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  VenteMySuffixComponent,
  VenteMySuffixDetailComponent,
  VenteMySuffixUpdateComponent,
  VenteMySuffixDeletePopupComponent,
  VenteMySuffixDeleteDialogComponent,
  venteRoute,
  ventePopupRoute
} from './';

const ENTITY_STATES = [...venteRoute, ...ventePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VenteMySuffixComponent,
    VenteMySuffixDetailComponent,
    VenteMySuffixUpdateComponent,
    VenteMySuffixDeleteDialogComponent,
    VenteMySuffixDeletePopupComponent
  ],
  entryComponents: [
    VenteMySuffixComponent,
    VenteMySuffixUpdateComponent,
    VenteMySuffixDeleteDialogComponent,
    VenteMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppVenteMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
