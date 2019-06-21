import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';

@Component({
  selector: 'jhi-employe-my-suffix-detail',
  templateUrl: './employe-my-suffix-detail.component.html'
})
export class EmployeMySuffixDetailComponent implements OnInit {
  employe: IEmployeMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ employe }) => {
      this.employe = employe;
    });
  }

  previousState() {
    window.history.back();
  }
}
