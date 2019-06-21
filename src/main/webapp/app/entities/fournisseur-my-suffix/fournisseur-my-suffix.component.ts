import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';
import { AccountService } from 'app/core';
import { FournisseurMySuffixService } from './fournisseur-my-suffix.service';

@Component({
  selector: 'jhi-fournisseur-my-suffix',
  templateUrl: './fournisseur-my-suffix.component.html'
})
export class FournisseurMySuffixComponent implements OnInit, OnDestroy {
  fournisseurs: IFournisseurMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected fournisseurService: FournisseurMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.fournisseurService
      .query()
      .pipe(
        filter((res: HttpResponse<IFournisseurMySuffix[]>) => res.ok),
        map((res: HttpResponse<IFournisseurMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IFournisseurMySuffix[]) => {
          this.fournisseurs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFournisseurs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFournisseurMySuffix) {
    return item.id;
  }

  registerChangeInFournisseurs() {
    this.eventSubscriber = this.eventManager.subscribe('fournisseurListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
