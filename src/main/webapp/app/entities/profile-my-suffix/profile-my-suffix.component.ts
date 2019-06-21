import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';
import { AccountService } from 'app/core';
import { ProfileMySuffixService } from './profile-my-suffix.service';

@Component({
  selector: 'jhi-profile-my-suffix',
  templateUrl: './profile-my-suffix.component.html'
})
export class ProfileMySuffixComponent implements OnInit, OnDestroy {
  profiles: IProfileMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected profileService: ProfileMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.profileService
      .query()
      .pipe(
        filter((res: HttpResponse<IProfileMySuffix[]>) => res.ok),
        map((res: HttpResponse<IProfileMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IProfileMySuffix[]) => {
          this.profiles = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProfiles();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProfileMySuffix) {
    return item.id;
  }

  registerChangeInProfiles() {
    this.eventSubscriber = this.eventManager.subscribe('profileListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
