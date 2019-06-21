import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';

@Component({
  selector: 'jhi-uti-profile-my-suffix-detail',
  templateUrl: './uti-profile-my-suffix-detail.component.html'
})
export class UtiProfileMySuffixDetailComponent implements OnInit {
  utiProfile: IUtiProfileMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ utiProfile }) => {
      this.utiProfile = utiProfile;
    });
  }

  previousState() {
    window.history.back();
  }
}
