import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';

@Component({
  selector: 'jhi-habilitation-my-suffix-detail',
  templateUrl: './habilitation-my-suffix-detail.component.html'
})
export class HabilitationMySuffixDetailComponent implements OnInit {
  habilitation: IHabilitationMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ habilitation }) => {
      this.habilitation = habilitation;
    });
  }

  previousState() {
    window.history.back();
  }
}
