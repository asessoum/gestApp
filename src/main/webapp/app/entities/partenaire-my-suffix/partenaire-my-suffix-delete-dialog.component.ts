import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { PartenaireMySuffixService } from './partenaire-my-suffix.service';

@Component({
  selector: 'jhi-partenaire-my-suffix-delete-dialog',
  templateUrl: './partenaire-my-suffix-delete-dialog.component.html'
})
export class PartenaireMySuffixDeleteDialogComponent {
  partenaire: IPartenaireMySuffix;

  constructor(
    protected partenaireService: PartenaireMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.partenaireService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'partenaireListModification',
        content: 'Deleted an partenaire'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-partenaire-my-suffix-delete-popup',
  template: ''
})
export class PartenaireMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ partenaire }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PartenaireMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.partenaire = partenaire;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/partenaire-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/partenaire-my-suffix', { outlets: { popup: null } }]);
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
