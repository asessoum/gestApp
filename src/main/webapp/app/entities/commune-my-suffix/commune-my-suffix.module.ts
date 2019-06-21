import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  CommuneMySuffixComponent,
  CommuneMySuffixDetailComponent,
  CommuneMySuffixUpdateComponent,
  CommuneMySuffixDeletePopupComponent,
  CommuneMySuffixDeleteDialogComponent,
  communeRoute,
  communePopupRoute
} from './';

const ENTITY_STATES = [...communeRoute, ...communePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CommuneMySuffixComponent,
    CommuneMySuffixDetailComponent,
    CommuneMySuffixUpdateComponent,
    CommuneMySuffixDeleteDialogComponent,
    CommuneMySuffixDeletePopupComponent
  ],
  entryComponents: [
    CommuneMySuffixComponent,
    CommuneMySuffixUpdateComponent,
    CommuneMySuffixDeleteDialogComponent,
    CommuneMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppCommuneMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
