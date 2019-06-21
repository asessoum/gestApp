import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';
import { AccountService } from 'app/core';
import { ArticleComposeMySuffixService } from './article-compose-my-suffix.service';

@Component({
  selector: 'jhi-article-compose-my-suffix',
  templateUrl: './article-compose-my-suffix.component.html'
})
export class ArticleComposeMySuffixComponent implements OnInit, OnDestroy {
  articleComposes: IArticleComposeMySuffix[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected articleComposeService: ArticleComposeMySuffixService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.articleComposeService
      .query()
      .pipe(
        filter((res: HttpResponse<IArticleComposeMySuffix[]>) => res.ok),
        map((res: HttpResponse<IArticleComposeMySuffix[]>) => res.body)
      )
      .subscribe(
        (res: IArticleComposeMySuffix[]) => {
          this.articleComposes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInArticleComposes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IArticleComposeMySuffix) {
    return item.id;
  }

  registerChangeInArticleComposes() {
    this.eventSubscriber = this.eventManager.subscribe('articleComposeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
