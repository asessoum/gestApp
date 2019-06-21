import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';

@Component({
  selector: 'jhi-reduction-my-suffix-detail',
  templateUrl: './reduction-my-suffix-detail.component.html'
})
export class ReductionMySuffixDetailComponent implements OnInit {
  reduction: IReductionMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reduction }) => {
      this.reduction = reduction;
    });
  }

  previousState() {
    window.history.back();
  }
}
