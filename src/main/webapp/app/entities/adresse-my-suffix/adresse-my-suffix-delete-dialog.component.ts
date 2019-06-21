import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';
import { AdresseMySuffixService } from './adresse-my-suffix.service';

@Component({
  selector: 'jhi-adresse-my-suffix-delete-dialog',
  templateUrl: './adresse-my-suffix-delete-dialog.component.html'
})
export class AdresseMySuffixDeleteDialogComponent {
  adresse: IAdresseMySuffix;

  constructor(
    protected adresseService: AdresseMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.adresseService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'adresseListModification',
        content: 'Deleted an adresse'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-adresse-my-suffix-delete-popup',
  template: ''
})
export class AdresseMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ adresse }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AdresseMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.adresse = adresse;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/adresse-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/adresse-my-suffix', { outlets: { popup: null } }]);
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
