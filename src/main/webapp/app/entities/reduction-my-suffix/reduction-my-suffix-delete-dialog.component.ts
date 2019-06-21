import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';
import { ReductionMySuffixService } from './reduction-my-suffix.service';

@Component({
  selector: 'jhi-reduction-my-suffix-delete-dialog',
  templateUrl: './reduction-my-suffix-delete-dialog.component.html'
})
export class ReductionMySuffixDeleteDialogComponent {
  reduction: IReductionMySuffix;

  constructor(
    protected reductionService: ReductionMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.reductionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'reductionListModification',
        content: 'Deleted an reduction'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reduction-my-suffix-delete-popup',
  template: ''
})
export class ReductionMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reduction }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReductionMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.reduction = reduction;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/reduction-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/reduction-my-suffix', { outlets: { popup: null } }]);
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
