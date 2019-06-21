import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaysMySuffix } from 'app/shared/model/pays-my-suffix.model';

@Component({
  selector: 'jhi-pays-my-suffix-detail',
  templateUrl: './pays-my-suffix-detail.component.html'
})
export class PaysMySuffixDetailComponent implements OnInit {
  pays: IPaysMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pays }) => {
      this.pays = pays;
    });
  }

  previousState() {
    window.history.back();
  }
}
