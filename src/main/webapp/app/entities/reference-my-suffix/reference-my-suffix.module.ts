import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  ReferenceMySuffixComponent,
  ReferenceMySuffixDetailComponent,
  ReferenceMySuffixUpdateComponent,
  ReferenceMySuffixDeletePopupComponent,
  ReferenceMySuffixDeleteDialogComponent,
  referenceRoute,
  referencePopupRoute
} from './';

const ENTITY_STATES = [...referenceRoute, ...referencePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReferenceMySuffixComponent,
    ReferenceMySuffixDetailComponent,
    ReferenceMySuffixUpdateComponent,
    ReferenceMySuffixDeleteDialogComponent,
    ReferenceMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ReferenceMySuffixComponent,
    ReferenceMySuffixUpdateComponent,
    ReferenceMySuffixDeleteDialogComponent,
    ReferenceMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppReferenceMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
