import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';

@Component({
  selector: 'jhi-mouvement-stock-my-suffix-detail',
  templateUrl: './mouvement-stock-my-suffix-detail.component.html'
})
export class MouvementStockMySuffixDetailComponent implements OnInit {
  mouvementStock: IMouvementStockMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mouvementStock }) => {
      this.mouvementStock = mouvementStock;
    });
  }

  previousState() {
    window.history.back();
  }
}
