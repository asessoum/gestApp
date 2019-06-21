import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVenteMySuffix } from 'app/shared/model/vente-my-suffix.model';

@Component({
  selector: 'jhi-vente-my-suffix-detail',
  templateUrl: './vente-my-suffix-detail.component.html'
})
export class VenteMySuffixDetailComponent implements OnInit {
  vente: IVenteMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vente }) => {
      this.vente = vente;
    });
  }

  previousState() {
    window.history.back();
  }
}
