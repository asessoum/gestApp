import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  CategorieMySuffixComponent,
  CategorieMySuffixDetailComponent,
  CategorieMySuffixUpdateComponent,
  CategorieMySuffixDeletePopupComponent,
  CategorieMySuffixDeleteDialogComponent,
  categorieRoute,
  categoriePopupRoute
} from './';

const ENTITY_STATES = [...categorieRoute, ...categoriePopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CategorieMySuffixComponent,
    CategorieMySuffixDetailComponent,
    CategorieMySuffixUpdateComponent,
    CategorieMySuffixDeleteDialogComponent,
    CategorieMySuffixDeletePopupComponent
  ],
  entryComponents: [
    CategorieMySuffixComponent,
    CategorieMySuffixUpdateComponent,
    CategorieMySuffixDeleteDialogComponent,
    CategorieMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppCategorieMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
