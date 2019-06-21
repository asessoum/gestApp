import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';
import { CategorieMySuffixService } from './categorie-my-suffix.service';

@Component({
  selector: 'jhi-categorie-my-suffix-delete-dialog',
  templateUrl: './categorie-my-suffix-delete-dialog.component.html'
})
export class CategorieMySuffixDeleteDialogComponent {
  categorie: ICategorieMySuffix;

  constructor(
    protected categorieService: CategorieMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.categorieService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'categorieListModification',
        content: 'Deleted an categorie'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-categorie-my-suffix-delete-popup',
  template: ''
})
export class CategorieMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ categorie }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CategorieMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.categorie = categorie;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/categorie-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/categorie-my-suffix', { outlets: { popup: null } }]);
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
