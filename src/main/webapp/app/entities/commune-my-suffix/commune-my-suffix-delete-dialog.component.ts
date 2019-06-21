import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommuneMySuffix } from 'app/shared/model/commune-my-suffix.model';
import { CommuneMySuffixService } from './commune-my-suffix.service';

@Component({
  selector: 'jhi-commune-my-suffix-delete-dialog',
  templateUrl: './commune-my-suffix-delete-dialog.component.html'
})
export class CommuneMySuffixDeleteDialogComponent {
  commune: ICommuneMySuffix;

  constructor(
    protected communeService: CommuneMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.communeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'communeListModification',
        content: 'Deleted an commune'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-commune-my-suffix-delete-popup',
  template: ''
})
export class CommuneMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ commune }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CommuneMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.commune = commune;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/commune-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/commune-my-suffix', { outlets: { popup: null } }]);
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
