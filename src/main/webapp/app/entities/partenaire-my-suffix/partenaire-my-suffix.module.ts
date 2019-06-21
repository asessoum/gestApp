import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  PartenaireMySuffixComponent,
  PartenaireMySuffixDetailComponent,
  PartenaireMySuffixUpdateComponent,
  PartenaireMySuffixDeletePopupComponent,
  PartenaireMySuffixDeleteDialogComponent,
  partenaireRoute,
  partenairePopupRoute
} from './';

const ENTITY_STATES = [...partenaireRoute, ...partenairePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PartenaireMySuffixComponent,
    PartenaireMySuffixDetailComponent,
    PartenaireMySuffixUpdateComponent,
    PartenaireMySuffixDeleteDialogComponent,
    PartenaireMySuffixDeletePopupComponent
  ],
  entryComponents: [
    PartenaireMySuffixComponent,
    PartenaireMySuffixUpdateComponent,
    PartenaireMySuffixDeleteDialogComponent,
    PartenaireMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppPartenaireMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
