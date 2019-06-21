import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReferenceMySuffix } from 'app/shared/model/reference-my-suffix.model';
import { ReferenceMySuffixService } from './reference-my-suffix.service';

@Component({
  selector: 'jhi-reference-my-suffix-delete-dialog',
  templateUrl: './reference-my-suffix-delete-dialog.component.html'
})
export class ReferenceMySuffixDeleteDialogComponent {
  reference: IReferenceMySuffix;

  constructor(
    protected referenceService: ReferenceMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.referenceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'referenceListModification',
        content: 'Deleted an reference'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reference-my-suffix-delete-popup',
  template: ''
})
export class ReferenceMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reference }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReferenceMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.reference = reference;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/reference-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/reference-my-suffix', { outlets: { popup: null } }]);
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
