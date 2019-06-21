import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  FournisseurMySuffixComponent,
  FournisseurMySuffixDetailComponent,
  FournisseurMySuffixUpdateComponent,
  FournisseurMySuffixDeletePopupComponent,
  FournisseurMySuffixDeleteDialogComponent,
  fournisseurRoute,
  fournisseurPopupRoute
} from './';

const ENTITY_STATES = [...fournisseurRoute, ...fournisseurPopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FournisseurMySuffixComponent,
    FournisseurMySuffixDetailComponent,
    FournisseurMySuffixUpdateComponent,
    FournisseurMySuffixDeleteDialogComponent,
    FournisseurMySuffixDeletePopupComponent
  ],
  entryComponents: [
    FournisseurMySuffixComponent,
    FournisseurMySuffixUpdateComponent,
    FournisseurMySuffixDeleteDialogComponent,
    FournisseurMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppFournisseurMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
