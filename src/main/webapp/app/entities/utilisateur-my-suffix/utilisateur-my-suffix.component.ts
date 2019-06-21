import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUtilisateurMySuffix } from 'app/shared/model/utilisateur-my-suffix.model';
import { AccountService } from 'app/core';
import { UtilisateurMySuffixService } from './utilisateur-my-suffix.service';

@Component({
  selector: 'jhi-utilisateur-my-suffix',
  templateUrl: './utilisateur-my-suffix.component.html'
})
export class UtilisateurMySuffixComponent implements OnInit, OnDestroy {
  utilisateurs: IUtilisateurMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected utilisateurService: UtilisateurMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.utilisateurService
      .query()
      .pipe(
        filter((res: HttpResponse<IUtilisateurMySuffix[]>) => res.ok),
        map((res: HttpResponse<IUtilisateurMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IUtilisateurMySuffix[]) => {
          this.utilisateurs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUtilisateurs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUtilisateurMySuffix) {
    return item.id;
  }

  registerChangeInUtilisateurs() {
    this.eventSubscriber = this.eventManager.subscribe('utilisateurListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
