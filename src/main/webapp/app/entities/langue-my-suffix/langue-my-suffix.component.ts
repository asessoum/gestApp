import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';
import { AccountService } from 'app/core';
import { LangueMySuffixService } from './langue-my-suffix.service';

@Component({
  selector: 'jhi-langue-my-suffix',
  templateUrl: './langue-my-suffix.component.html'
})
export class LangueMySuffixComponent implements OnInit, OnDestroy {
  langues: ILangueMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected langueService: LangueMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.langueService
      .query()
      .pipe(
        filter((res: HttpResponse<ILangueMySuffix[]>) => res.ok),
        map((res: HttpResponse<ILangueMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: ILangueMySuffix[]) => {
          this.langues = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLangues();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILangueMySuffix) {
    return item.id;
  }

  registerChangeInLangues() {
    this.eventSubscriber = this.eventManager.subscribe('langueListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
