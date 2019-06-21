import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStockMySuffix } from 'app/shared/model/stock-my-suffix.model';
import { StockMySuffixService } from './stock-my-suffix.service';

@Component({
  selector: 'jhi-stock-my-suffix-delete-dialog',
  templateUrl: './stock-my-suffix-delete-dialog.component.html'
})
export class StockMySuffixDeleteDialogComponent {
  stock: IStockMySuffix;

  constructor(protected stockService: StockMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.stockService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'stockListModification',
        content: 'Deleted an stock'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-stock-my-suffix-delete-popup',
  template: ''
})
export class StockMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ stock }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StockMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.stock = stock;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/stock-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/stock-my-suffix', { outlets: { popup: null } }]);
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
