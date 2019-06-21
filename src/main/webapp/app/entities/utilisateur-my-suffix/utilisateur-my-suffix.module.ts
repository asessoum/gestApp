import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  UtilisateurMySuffixComponent,
  UtilisateurMySuffixDetailComponent,
  UtilisateurMySuffixUpdateComponent,
  UtilisateurMySuffixDeletePopupComponent,
  UtilisateurMySuffixDeleteDialogComponent,
  utilisateurRoute,
  utilisateurPopupRoute
} from './';

const ENTITY_STATES = [...utilisateurRoute, ...utilisateurPopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UtilisateurMySuffixComponent,
    UtilisateurMySuffixDetailComponent,
    UtilisateurMySuffixUpdateComponent,
    UtilisateurMySuffixDeleteDialogComponent,
    UtilisateurMySuffixDeletePopupComponent
  ],
  entryComponents: [
    UtilisateurMySuffixComponent,
    UtilisateurMySuffixUpdateComponent,
    UtilisateurMySuffixDeleteDialogComponent,
    UtilisateurMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppUtilisateurMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
