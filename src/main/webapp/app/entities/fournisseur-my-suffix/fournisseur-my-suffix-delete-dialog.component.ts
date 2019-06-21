import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';
import { FournisseurMySuffixService } from './fournisseur-my-suffix.service';

@Component({
  selector: 'jhi-fournisseur-my-suffix-delete-dialog',
  templateUrl: './fournisseur-my-suffix-delete-dialog.component.html'
})
export class FournisseurMySuffixDeleteDialogComponent {
  fournisseur: IFournisseurMySuffix;

  constructor(
    protected fournisseurService: FournisseurMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.fournisseurService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'fournisseurListModification',
        content: 'Deleted an fournisseur'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-fournisseur-my-suffix-delete-popup',
  template: ''
})
export class FournisseurMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fournisseur }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FournisseurMySuffixDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.fournisseur = fournisseur;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/fournisseur-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/fournisseur-my-suffix', { outlets: { popup: null } }]);
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
