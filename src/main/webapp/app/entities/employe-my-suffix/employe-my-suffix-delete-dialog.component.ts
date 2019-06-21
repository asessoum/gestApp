import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';
import { EmployeMySuffixService } from './employe-my-suffix.service';

@Component({
  selector: 'jhi-employe-my-suffix-delete-dialog',
  templateUrl: './employe-my-suffix-delete-dialog.component.html'
})
export class EmployeMySuffixDeleteDialogComponent {
  employe: IEmployeMySuffix;

  constructor(
    protected employeService: EmployeMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.employeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'employeListModification',
        content: 'Deleted an employe'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-employe-my-suffix-delete-popup',
  template: ''
})
export class EmployeMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ employe }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EmployeMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.employe = employe;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/employe-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/employe-my-suffix', { outlets: { popup: null } }]);
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
