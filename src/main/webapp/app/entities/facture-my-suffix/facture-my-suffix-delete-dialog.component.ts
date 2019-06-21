import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFactureMySuffix } from 'app/shared/model/facture-my-suffix.model';
import { FactureMySuffixService } from './facture-my-suffix.service';

@Component({
  selector: 'jhi-facture-my-suffix-delete-dialog',
  templateUrl: './facture-my-suffix-delete-dialog.component.html'
})
export class FactureMySuffixDeleteDialogComponent {
  facture: IFactureMySuffix;

  constructor(
    protected factureService: FactureMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.factureService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'factureListModification',
        content: 'Deleted an facture'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-facture-my-suffix-delete-popup',
  template: ''
})
export class FactureMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ facture }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FactureMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.facture = facture;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/facture-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/facture-my-suffix', { outlets: { popup: null } }]);
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
