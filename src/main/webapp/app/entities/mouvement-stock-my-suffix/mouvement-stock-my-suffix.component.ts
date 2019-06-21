import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';
import { AccountService } from 'app/core';
import { MouvementStockMySuffixService } from './mouvement-stock-my-suffix.service';

@Component({
  selector: 'jhi-mouvement-stock-my-suffix',
  templateUrl: './mouvement-stock-my-suffix.component.html'
})
export class MouvementStockMySuffixComponent implements OnInit, OnDestroy {
  mouvementStocks: IMouvementStockMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected mouvementStockService: MouvementStockMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.mouvementStockService
      .query()
      .pipe(
        filter((res: HttpResponse<IMouvementStockMySuffix[]>) => res.ok),
        map((res: HttpResponse<IMouvementStockMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IMouvementStockMySuffix[]) => {
          this.mouvementStocks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMouvementStocks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMouvementStockMySuffix) {
    return item.id;
  }

  registerChangeInMouvementStocks() {
    this.eventSubscriber = this.eventManager.subscribe('mouvementStockListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
