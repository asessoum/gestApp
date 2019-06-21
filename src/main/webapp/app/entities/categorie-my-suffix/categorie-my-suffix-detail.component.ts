import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';

@Component({
  selector: 'jhi-categorie-my-suffix-detail',
  templateUrl: './categorie-my-suffix-detail.component.html'
})
export class CategorieMySuffixDetailComponent implements OnInit {
  categorie: ICategorieMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ categorie }) => {
      this.categorie = categorie;
    });
  }

  previousState() {
    window.history.back();
  }
}
