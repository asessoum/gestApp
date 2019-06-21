import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';
import { AccountService } from 'app/core';
import { ArticleMySuffixService } from './article-my-suffix.service';

@Component({
  selector: 'jhi-article-my-suffix',
  templateUrl: './article-my-suffix.component.html'
})
export class ArticleMySuffixComponent implements OnInit, OnDestroy {
  articles: IArticleMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected articleService: ArticleMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.articleService
      .query()
      .pipe(
        filter((res: HttpResponse<IArticleMySuffix[]>) => res.ok),
        map((res: HttpResponse<IArticleMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IArticleMySuffix[]) => {
          this.articles = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInArticles();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IArticleMySuffix) {
    return item.id;
  }

  registerChangeInArticles() {
    this.eventSubscriber = this.eventManager.subscribe('articleListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
