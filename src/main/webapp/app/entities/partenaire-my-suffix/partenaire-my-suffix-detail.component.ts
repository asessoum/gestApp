import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';

@Component({
  selector: 'jhi-partenaire-my-suffix-detail',
  templateUrl: './partenaire-my-suffix-detail.component.html'
})
export class PartenaireMySuffixDetailComponent implements OnInit {
  partenaire: IPartenaireMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ partenaire }) => {
      this.partenaire = partenaire;
    });
  }

  previousState() {
    window.history.back();
  }
}
