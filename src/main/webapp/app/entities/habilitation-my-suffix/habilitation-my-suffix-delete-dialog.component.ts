import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';
import { HabilitationMySuffixService } from './habilitation-my-suffix.service';

@Component({
  selector: 'jhi-habilitation-my-suffix-delete-dialog',
  templateUrl: './habilitation-my-suffix-delete-dialog.component.html'
})
export class HabilitationMySuffixDeleteDialogComponent {
  habilitation: IHabilitationMySuffix;

  constructor(
    protected habilitationService: HabilitationMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.habilitationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'habilitationListModification',
        content: 'Deleted an habilitation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-habilitation-my-suffix-delete-popup',
  template: ''
})
export class HabilitationMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ habilitation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(HabilitationMySuffixDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.habilitation = habilitation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/habilitation-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/habilitation-my-suffix', { outlets: { popup: null } }]);
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
