import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';

@Component({
  selector: 'jhi-fournisseur-my-suffix-detail',
  templateUrl: './fournisseur-my-suffix-detail.component.html'
})
export class FournisseurMySuffixDetailComponent implements OnInit {
  fournisseur: IFournisseurMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fournisseur }) => {
      this.fournisseur = fournisseur;
    });
  }

  previousState() {
    window.history.back();
  }
}
