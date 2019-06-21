import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';
import { UtiProfileMySuffixService } from './uti-profile-my-suffix.service';

@Component({
  selector: 'jhi-uti-profile-my-suffix-delete-dialog',
  templateUrl: './uti-profile-my-suffix-delete-dialog.component.html'
})
export class UtiProfileMySuffixDeleteDialogComponent {
  utiProfile: IUtiProfileMySuffix;

  constructor(
    protected utiProfileService: UtiProfileMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.utiProfileService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'utiProfileListModification',
        content: 'Deleted an utiProfile'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-uti-profile-my-suffix-delete-popup',
  template: ''
})
export class UtiProfileMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ utiProfile }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UtiProfileMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.utiProfile = utiProfile;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/uti-profile-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/uti-profile-my-suffix', { outlets: { popup: null } }]);
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
