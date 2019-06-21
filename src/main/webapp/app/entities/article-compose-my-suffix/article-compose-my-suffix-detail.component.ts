import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';

@Component({
  selector: 'jhi-article-compose-my-suffix-detail',
  templateUrl: './article-compose-my-suffix-detail.component.html'
})
export class ArticleComposeMySuffixDetailComponent implements OnInit {
  articleCompose: IArticleComposeMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ articleCompose }) => {
      this.articleCompose = articleCompose;
    });
  }

  previousState() {
    window.history.back();
  }
}
