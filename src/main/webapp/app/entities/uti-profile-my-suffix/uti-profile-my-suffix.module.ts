import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  UtiProfileMySuffixComponent,
  UtiProfileMySuffixDetailComponent,
  UtiProfileMySuffixUpdateComponent,
  UtiProfileMySuffixDeletePopupComponent,
  UtiProfileMySuffixDeleteDialogComponent,
  utiProfileRoute,
  utiProfilePopupRoute
} from './';

const ENTITY_STATES = [...utiProfileRoute, ...utiProfilePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UtiProfileMySuffixComponent,
    UtiProfileMySuffixDetailComponent,
    UtiProfileMySuffixUpdateComponent,
    UtiProfileMySuffixDeleteDialogComponent,
    UtiProfileMySuffixDeletePopupComponent
  ],
  entryComponents: [
    UtiProfileMySuffixComponent,
    UtiProfileMySuffixUpdateComponent,
    UtiProfileMySuffixDeleteDialogComponent,
    UtiProfileMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppUtiProfileMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
