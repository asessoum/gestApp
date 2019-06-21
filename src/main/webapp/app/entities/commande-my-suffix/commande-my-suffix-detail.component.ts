import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommandeMySuffix } from 'app/shared/model/commande-my-suffix.model';

@Component({
  selector: 'jhi-commande-my-suffix-detail',
  templateUrl: './commande-my-suffix-detail.component.html'
})
export class CommandeMySuffixDetailComponent implements OnInit {
  commande: ICommandeMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ commande }) => {
      this.commande = commande;
    });
  }

  previousState() {
    window.history.back();
  }
}
