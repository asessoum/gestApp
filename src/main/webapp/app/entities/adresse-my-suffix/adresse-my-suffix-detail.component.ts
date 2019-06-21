import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';

@Component({
  selector: 'jhi-adresse-my-suffix-detail',
  templateUrl: './adresse-my-suffix-detail.component.html'
})
export class AdresseMySuffixDetailComponent implements OnInit {
  adresse: IAdresseMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ adresse }) => {
      this.adresse = adresse;
    });
  }

  previousState() {
    window.history.back();
  }
}
