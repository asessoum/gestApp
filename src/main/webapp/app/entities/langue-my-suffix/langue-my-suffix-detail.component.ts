import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';

@Component({
  selector: 'jhi-langue-my-suffix-detail',
  templateUrl: './langue-my-suffix-detail.component.html'
})
export class LangueMySuffixDetailComponent implements OnInit {
  langue: ILangueMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ langue }) => {
      this.langue = langue;
    });
  }

  previousState() {
    window.history.back();
  }
}
