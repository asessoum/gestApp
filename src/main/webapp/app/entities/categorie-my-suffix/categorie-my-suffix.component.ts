import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';
import { AccountService } from 'app/core';
import { CategorieMySuffixService } from './categorie-my-suffix.service';

@Component({
  selector: 'jhi-categorie-my-suffix',
  templateUrl: './categorie-my-suffix.component.html'
})
export class CategorieMySuffixComponent implements OnInit, OnDestroy {
  categories: ICategorieMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected categorieService: CategorieMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.categorieService
      .query()
      .pipe(
        filter((res: HttpResponse<ICategorieMySuffix[]>) => res.ok),
        map((res: HttpResponse<ICategorieMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: ICategorieMySuffix[]) => {
          this.categories = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCategories();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICategorieMySuffix) {
    return item.id;
  }

  registerChangeInCategories() {
    this.eventSubscriber = this.eventManager.subscribe('categorieListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
