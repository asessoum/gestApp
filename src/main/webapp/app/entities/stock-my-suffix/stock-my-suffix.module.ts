import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestAppSharedModule } from 'app/shared';
import {
  StockMySuffixComponent,
  StockMySuffixDetailComponent,
  StockMySuffixUpdateComponent,
  StockMySuffixDeletePopupComponent,
  StockMySuffixDeleteDialogComponent,
  stockRoute,
  stockPopupRoute
} from './';

const ENTITY_STATES = [...stockRoute, ...stockPopupRoute];

@NgModule({
  imports: [GestAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StockMySuffixComponent,
    StockMySuffixDetailComponent,
    StockMySuffixUpdateComponent,
    StockMySuffixDeleteDialogComponent,
    StockMySuffixDeletePopupComponent
  ],
  entryComponents: [
    StockMySuffixComponent,
    StockMySuffixUpdateComponent,
    StockMySuffixDeleteDialogComponent,
    StockMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppStockMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
