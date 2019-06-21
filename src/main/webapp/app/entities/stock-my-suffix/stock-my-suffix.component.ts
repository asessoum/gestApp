import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStockMySuffix } from 'app/shared/model/stock-my-suffix.model';
import { AccountService } from 'app/core';
import { StockMySuffixService } from './stock-my-suffix.service';

@Component({
  selector: 'jhi-stock-my-suffix',
  templateUrl: './stock-my-suffix.component.html'
})
export class StockMySuffixComponent implements OnInit, OnDestroy {
  stocks: IStockMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected stockService: StockMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.stockService
      .query()
      .pipe(
        filter((res: HttpResponse<IStockMySuffix[]>) => res.ok),
        map((res: HttpResponse<IStockMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IStockMySuffix[]) => {
          this.stocks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStocks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStockMySuffix) {
    return item.id;
  }

  registerChangeInStocks() {
    this.eventSubscriber = this.eventManager.subscribe('stockListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
