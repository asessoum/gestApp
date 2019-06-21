import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from './client-my-suffix.service';

@Component({
  selector: 'jhi-client-my-suffix-delete-dialog',
  templateUrl: './client-my-suffix-delete-dialog.component.html'
})
export class ClientMySuffixDeleteDialogComponent {
  client: IClientMySuffix;

  constructor(
    protected clientService: ClientMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.clientService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'clientListModification',
        content: 'Deleted an client'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-client-my-suffix-delete-popup',
  template: ''
})
export class ClientMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ client }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ClientMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.client = client;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/client-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/client-my-suffix', { outlets: { popup: null } }]);
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
