import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';
import { MouvementStockMySuffixService } from './mouvement-stock-my-suffix.service';

@Component({
  selector: 'jhi-mouvement-stock-my-suffix-delete-dialog',
  templateUrl: './mouvement-stock-my-suffix-delete-dialog.component.html'
})
export class MouvementStockMySuffixDeleteDialogComponent {
  mouvementStock: IMouvementStockMySuffix;

  constructor(
    protected mouvementStockService: MouvementStockMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mouvementStockService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mouvementStockListModification',
        content: 'Deleted an mouvementStock'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-mouvement-stock-my-suffix-delete-popup',
  template: ''
})
export class MouvementStockMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mouvementStock }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MouvementStockMySuffixDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.mouvementStock = mouvementStock;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/mouvement-stock-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/mouvement-stock-my-suffix', { outlets: { popup: null } }]);
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
