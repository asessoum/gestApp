import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';
import { ProfileMySuffixService } from './profile-my-suffix.service';

@Component({
  selector: 'jhi-profile-my-suffix-delete-dialog',
  templateUrl: './profile-my-suffix-delete-dialog.component.html'
})
export class ProfileMySuffixDeleteDialogComponent {
  profile: IProfileMySuffix;

  constructor(
    protected profileService: ProfileMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.profileService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'profileListModification',
        content: 'Deleted an profile'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-profile-my-suffix-delete-popup',
  template: ''
})
export class ProfileMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ profile }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProfileMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.profile = profile;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/profile-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/profile-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
