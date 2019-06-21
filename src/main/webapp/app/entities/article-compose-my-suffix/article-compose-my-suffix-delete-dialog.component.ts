import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';
import { ArticleComposeMySuffixService } from './article-compose-my-suffix.service';

@Component({
  selector: 'jhi-article-compose-my-suffix-delete-dialog',
  templateUrl: './article-compose-my-suffix-delete-dialog.component.html'
})
export class ArticleComposeMySuffixDeleteDialogComponent {
  articleCompose: IArticleComposeMySuffix;

  constructor(
    protected articleComposeService: ArticleComposeMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.articleComposeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'articleComposeListModification',
        content: 'Deleted an articleCompose'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-article-compose-my-suffix-delete-popup',
  template: ''
})
export class ArticleComposeMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ articleCompose }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ArticleComposeMySuffixDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.articleCompose = articleCompose;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/article-compose-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/article-compose-my-suffix', { outlets: { popup: null } }]);
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
