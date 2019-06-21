import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFactureMySuffix } from 'app/shared/model/facture-my-suffix.model';

@Component({
  selector: 'jhi-facture-my-suffix-detail',
  templateUrl: './facture-my-suffix-detail.component.html'
})
export class FactureMySuffixDetailComponent implements OnInit {
  facture: IFactureMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ facture }) => {
      this.facture = facture;
    });
  }

  previousState() {
    window.history.back();
  }
}
