import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFactureMySuffix } from 'app/shared/model/facture-my-suffix.model';
import { AccountService } from 'app/core';
import { FactureMySuffixService } from './facture-my-suffix.service';

@Component({
  selector: 'jhi-facture-my-suffix',
  templateUrl: './facture-my-suffix.component.html'
})
export class FactureMySuffixComponent implements OnInit, OnDestroy {
  factures: IFactureMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected factureService: FactureMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.factureService
      .query()
      .pipe(
        filter((res: HttpResponse<IFactureMySuffix[]>) => res.ok),
        map((res: HttpResponse<IFactureMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IFactureMySuffix[]) => {
          this.factures = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFactures();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFactureMySuffix) {
    return item.id;
  }

  registerChangeInFactures() {
    this.eventSubscriber = this.eventManager.subscribe('factureListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
