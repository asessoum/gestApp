import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

@Component({
  selector: 'jhi-article-my-suffix-detail',
  templateUrl: './article-my-suffix-detail.component.html'
})
export class ArticleMySuffixDetailComponent implements OnInit {
  article: IArticleMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.article = article;
    });
  }

  previousState() {
    window.history.back();
  }
}
