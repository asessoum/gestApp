import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';
import { AccountService } from 'app/core';
import { HabilitationMySuffixService } from './habilitation-my-suffix.service';

@Component({
  selector: 'jhi-habilitation-my-suffix',
  templateUrl: './habilitation-my-suffix.component.html'
})
export class HabilitationMySuffixComponent implements OnInit, OnDestroy {
  habilitations: IHabilitationMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected habilitationService: HabilitationMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.habilitationService
      .query()
      .pipe(
        filter((res: HttpResponse<IHabilitationMySuffix[]>) => res.ok),
        map((res: HttpResponse<IHabilitationMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IHabilitationMySuffix[]) => {
          this.habilitations = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInHabilitations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IHabilitationMySuffix) {
    return item.id;
  }

  registerChangeInHabilitations() {
    this.eventSubscriber = this.eventManager.subscribe('habilitationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
