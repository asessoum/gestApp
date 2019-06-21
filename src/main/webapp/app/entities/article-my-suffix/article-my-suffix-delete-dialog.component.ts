import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';
import { ArticleMySuffixService } from './article-my-suffix.service';

@Component({
  selector: 'jhi-article-my-suffix-delete-dialog',
  templateUrl: './article-my-suffix-delete-dialog.component.html'
})
export class ArticleMySuffixDeleteDialogComponent {
  article: IArticleMySuffix;

  constructor(
    protected articleService: ArticleMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.articleService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'articleListModification',
        content: 'Deleted an article'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-article-my-suffix-delete-popup',
  template: ''
})
export class ArticleMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ article }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ArticleMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.article = article;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/article-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/article-my-suffix', { outlets: { popup: null } }]);
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
