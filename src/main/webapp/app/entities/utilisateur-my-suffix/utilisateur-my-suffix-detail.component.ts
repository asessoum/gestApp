import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUtilisateurMySuffix } from 'app/shared/model/utilisateur-my-suffix.model';

@Component({
  selector: 'jhi-utilisateur-my-suffix-detail',
  templateUrl: './utilisateur-my-suffix-detail.component.html'
})
export class UtilisateurMySuffixDetailComponent implements OnInit {
  utilisateur: IUtilisateurMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ utilisateur }) => {
      this.utilisateur = utilisateur;
    });
  }

  previousState() {
    window.history.back();
  }
}
