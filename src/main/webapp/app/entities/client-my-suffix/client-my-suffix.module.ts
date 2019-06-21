import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  ClientMySuffixComponent,
  ClientMySuffixDetailComponent,
  ClientMySuffixUpdateComponent,
  ClientMySuffixDeletePopupComponent,
  ClientMySuffixDeleteDialogComponent,
  clientRoute,
  clientPopupRoute
} from './';

const ENTITY_STATES = [...clientRoute, ...clientPopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ClientMySuffixComponent,
    ClientMySuffixDetailComponent,
    ClientMySuffixUpdateComponent,
    ClientMySuffixDeleteDialogComponent,
    ClientMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ClientMySuffixComponent,
    ClientMySuffixUpdateComponent,
    ClientMySuffixDeleteDialogComponent,
    ClientMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppClientMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
