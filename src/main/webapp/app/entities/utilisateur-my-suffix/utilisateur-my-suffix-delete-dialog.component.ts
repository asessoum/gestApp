import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUtilisateurMySuffix } from 'app/shared/model/utilisateur-my-suffix.model';
import { UtilisateurMySuffixService } from './utilisateur-my-suffix.service';

@Component({
  selector: 'jhi-utilisateur-my-suffix-delete-dialog',
  templateUrl: './utilisateur-my-suffix-delete-dialog.component.html'
})
export class UtilisateurMySuffixDeleteDialogComponent {
  utilisateur: IUtilisateurMySuffix;

  constructor(
    protected utilisateurService: UtilisateurMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.utilisateurService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'utilisateurListModification',
        content: 'Deleted an utilisateur'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-utilisateur-my-suffix-delete-popup',
  template: ''
})
export class UtilisateurMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ utilisateur }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UtilisateurMySuffixDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.utilisateur = utilisateur;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/utilisateur-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/utilisateur-my-suffix', { outlets: { popup: null } }]);
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
