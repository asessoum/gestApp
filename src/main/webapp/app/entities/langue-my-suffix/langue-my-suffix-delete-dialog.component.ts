import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';
import { LangueMySuffixService } from './langue-my-suffix.service';

@Component({
  selector: 'jhi-langue-my-suffix-delete-dialog',
  templateUrl: './langue-my-suffix-delete-dialog.component.html'
})
export class LangueMySuffixDeleteDialogComponent {
  langue: ILangueMySuffix;

  constructor(
    protected langueService: LangueMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.langueService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'langueListModification',
        content: 'Deleted an langue'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-langue-my-suffix-delete-popup',
  template: ''
})
export class LangueMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ langue }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LangueMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.langue = langue;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/langue-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/langue-my-suffix', { outlets: { popup: null } }]);
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
