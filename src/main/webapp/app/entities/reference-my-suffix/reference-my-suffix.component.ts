import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReferenceMySuffix } from 'app/shared/model/reference-my-suffix.model';
import { AccountService } from 'app/core';
import { ReferenceMySuffixService } from './reference-my-suffix.service';

@Component({
  selector: 'jhi-reference-my-suffix',
  templateUrl: './reference-my-suffix.component.html'
})
export class ReferenceMySuffixComponent implements OnInit, OnDestroy {
  references: IReferenceMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected referenceService: ReferenceMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.referenceService
      .query()
      .pipe(
        filter((res: HttpResponse<IReferenceMySuffix[]>) => res.ok),
        map((res: HttpResponse<IReferenceMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IReferenceMySuffix[]) => {
          this.references = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInReferences();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReferenceMySuffix) {
    return item.id;
  }

  registerChangeInReferences() {
    this.eventSubscriber = this.eventManager.subscribe('referenceListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
