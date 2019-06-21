import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  ProfileMySuffixComponent,
  ProfileMySuffixDetailComponent,
  ProfileMySuffixUpdateComponent,
  ProfileMySuffixDeletePopupComponent,
  ProfileMySuffixDeleteDialogComponent,
  profileRoute,
  profilePopupRoute
} from './';

const ENTITY_STATES = [...profileRoute, ...profilePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProfileMySuffixComponent,
    ProfileMySuffixDetailComponent,
    ProfileMySuffixUpdateComponent,
    ProfileMySuffixDeleteDialogComponent,
    ProfileMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ProfileMySuffixComponent,
    ProfileMySuffixUpdateComponent,
    ProfileMySuffixDeleteDialogComponent,
    ProfileMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppProfileMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
