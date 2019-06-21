import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';
import { AccountService } from 'app/core';
import { ReductionMySuffixService } from './reduction-my-suffix.service';

@Component({
  selector: 'jhi-reduction-my-suffix',
  templateUrl: './reduction-my-suffix.component.html'
})
export class ReductionMySuffixComponent implements OnInit, OnDestroy {
  reductions: IReductionMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected reductionService: ReductionMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.reductionService
      .query()
      .pipe(
        filter((res: HttpResponse<IReductionMySuffix[]>) => res.ok),
        map((res: HttpResponse<IReductionMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IReductionMySuffix[]) => {
          this.reductions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInReductions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReductionMySuffix) {
    return item.id;
  }

  registerChangeInReductions() {
    this.eventSubscriber = this.eventManager.subscribe('reductionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
