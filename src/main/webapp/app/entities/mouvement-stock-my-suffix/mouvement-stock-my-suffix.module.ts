import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  MouvementStockMySuffixComponent,
  MouvementStockMySuffixDetailComponent,
  MouvementStockMySuffixUpdateComponent,
  MouvementStockMySuffixDeletePopupComponent,
  MouvementStockMySuffixDeleteDialogComponent,
  mouvementStockRoute,
  mouvementStockPopupRoute
} from './';

const ENTITY_STATES = [...mouvementStockRoute, ...mouvementStockPopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MouvementStockMySuffixComponent,
    MouvementStockMySuffixDetailComponent,
    MouvementStockMySuffixUpdateComponent,
    MouvementStockMySuffixDeleteDialogComponent,
    MouvementStockMySuffixDeletePopupComponent
  ],
  entryComponents: [
    MouvementStockMySuffixComponent,
    MouvementStockMySuffixUpdateComponent,
    MouvementStockMySuffixDeleteDialogComponent,
    MouvementStockMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppMouvementStockMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
