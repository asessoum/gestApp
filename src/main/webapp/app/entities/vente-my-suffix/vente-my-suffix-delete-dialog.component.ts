import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVenteMySuffix } from 'app/shared/model/vente-my-suffix.model';
import { VenteMySuffixService } from './vente-my-suffix.service';

@Component({
  selector: 'jhi-vente-my-suffix-delete-dialog',
  templateUrl: './vente-my-suffix-delete-dialog.component.html'
})
export class VenteMySuffixDeleteDialogComponent {
  vente: IVenteMySuffix;

  constructor(protected venteService: VenteMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.venteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'venteListModification',
        content: 'Deleted an vente'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-vente-my-suffix-delete-popup',
  template: ''
})
export class VenteMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ vente }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VenteMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.vente = vente;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/vente-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/vente-my-suffix', { outlets: { popup: null } }]);
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
