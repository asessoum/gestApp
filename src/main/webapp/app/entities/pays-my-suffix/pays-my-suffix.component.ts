import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPaysMySuffix } from 'app/shared/model/pays-my-suffix.model';
import { AccountService } from 'app/core';
import { PaysMySuffixService } from './pays-my-suffix.service';

@Component({
  selector: 'jhi-pays-my-suffix',
  templateUrl: './pays-my-suffix.component.html'
})
export class PaysMySuffixComponent implements OnInit, OnDestroy {
  pays: IPaysMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected paysService: PaysMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.paysService
      .query()
      .pipe(
        filter((res: HttpResponse<IPaysMySuffix[]>) => res.ok),
        map((res: HttpResponse<IPaysMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IPaysMySuffix[]) => {
          this.pays = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPays();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPaysMySuffix) {
    return item.id;
  }

  registerChangeInPays() {
    this.eventSubscriber = this.eventManager.subscribe('paysListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
