import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICommuneMySuffix } from 'app/shared/model/commune-my-suffix.model';
import { AccountService } from 'app/core';
import { CommuneMySuffixService } from './commune-my-suffix.service';

@Component({
  selector: 'jhi-commune-my-suffix',
  templateUrl: './commune-my-suffix.component.html'
})
export class CommuneMySuffixComponent implements OnInit, OnDestroy {
  communes: ICommuneMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected communeService: CommuneMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.communeService
      .query()
      .pipe(
        filter((res: HttpResponse<ICommuneMySuffix[]>) => res.ok),
        map((res: HttpResponse<ICommuneMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: ICommuneMySuffix[]) => {
          this.communes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCommunes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICommuneMySuffix) {
    return item.id;
  }

  registerChangeInCommunes() {
    this.eventSubscriber = this.eventManager.subscribe('communeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
