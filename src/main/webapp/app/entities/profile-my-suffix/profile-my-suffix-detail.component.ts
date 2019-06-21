import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';

@Component({
  selector: 'jhi-profile-my-suffix-detail',
  templateUrl: './profile-my-suffix-detail.component.html'
})
export class ProfileMySuffixDetailComponent implements OnInit {
  profile: IProfileMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ profile }) => {
      this.profile = profile;
    });
  }

  previousState() {
    window.history.back();
  }
}
