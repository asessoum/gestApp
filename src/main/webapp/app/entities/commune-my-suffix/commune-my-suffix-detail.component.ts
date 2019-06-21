import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommuneMySuffix } from 'app/shared/model/commune-my-suffix.model';

@Component({
  selector: 'jhi-commune-my-suffix-detail',
  templateUrl: './commune-my-suffix-detail.component.html'
})
export class CommuneMySuffixDetailComponent implements OnInit {
  commune: ICommuneMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ commune }) => {
      this.commune = commune;
    });
  }

  previousState() {
    window.history.back();
  }
}
