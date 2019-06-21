import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  EmployeMySuffixComponent,
  EmployeMySuffixDetailComponent,
  EmployeMySuffixUpdateComponent,
  EmployeMySuffixDeletePopupComponent,
  EmployeMySuffixDeleteDialogComponent,
  employeRoute,
  employePopupRoute
} from './';

const ENTITY_STATES = [...employeRoute, ...employePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EmployeMySuffixComponent,
    EmployeMySuffixDetailComponent,
    EmployeMySuffixUpdateComponent,
    EmployeMySuffixDeleteDialogComponent,
    EmployeMySuffixDeletePopupComponent
  ],
  entryComponents: [
    EmployeMySuffixComponent,
    EmployeMySuffixUpdateComponent,
    EmployeMySuffixDeleteDialogComponent,
    EmployeMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppEmployeMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
