import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaysMySuffix } from 'app/shared/model/pays-my-suffix.model';
import { PaysMySuffixService } from './pays-my-suffix.service';

@Component({
  selector: 'jhi-pays-my-suffix-delete-dialog',
  templateUrl: './pays-my-suffix-delete-dialog.component.html'
})
export class PaysMySuffixDeleteDialogComponent {
  pays: IPaysMySuffix;

  constructor(protected paysService: PaysMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.paysService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'paysListModification',
        content: 'Deleted an pays'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-pays-my-suffix-delete-popup',
  template: ''
})
export class PaysMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pays }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PaysMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pays = pays;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/pays-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/pays-my-suffix', { outlets: { popup: null } }]);
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
