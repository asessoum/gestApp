import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';
import { AccountService } from 'app/core';
import { UtiProfileMySuffixService } from './uti-profile-my-suffix.service';

@Component({
  selector: 'jhi-uti-profile-my-suffix',
  templateUrl: './uti-profile-my-suffix.component.html'
})
export class UtiProfileMySuffixComponent implements OnInit, OnDestroy {
  utiProfiles: IUtiProfileMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected utiProfileService: UtiProfileMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.utiProfileService
      .query()
      .pipe(
        filter((res: HttpResponse<IUtiProfileMySuffix[]>) => res.ok),
        map((res: HttpResponse<IUtiProfileMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IUtiProfileMySuffix[]) => {
          this.utiProfiles = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUtiProfiles();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUtiProfileMySuffix) {
    return item.id;
  }

  registerChangeInUtiProfiles() {
    this.eventSubscriber = this.eventManager.subscribe('utiProfileListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
