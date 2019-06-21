import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  ReductionMySuffixComponent,
  ReductionMySuffixDetailComponent,
  ReductionMySuffixUpdateComponent,
  ReductionMySuffixDeletePopupComponent,
  ReductionMySuffixDeleteDialogComponent,
  reductionRoute,
  reductionPopupRoute
} from './';

const ENTITY_STATES = [...reductionRoute, ...reductionPopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReductionMySuffixComponent,
    ReductionMySuffixDetailComponent,
    ReductionMySuffixUpdateComponent,
    ReductionMySuffixDeleteDialogComponent,
    ReductionMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ReductionMySuffixComponent,
    ReductionMySuffixUpdateComponent,
    ReductionMySuffixDeleteDialogComponent,
    ReductionMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppReductionMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
