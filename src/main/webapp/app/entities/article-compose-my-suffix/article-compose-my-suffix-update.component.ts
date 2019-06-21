import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IArticleComposeMySuffix, ArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';
import { ArticleComposeMySuffixService } from './article-compose-my-suffix.service';

@Component({
  selector: 'jhi-article-compose-my-suffix-update',
  templateUrl: './article-compose-my-suffix-update.component.html'
})
export class ArticleComposeMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    nombre: []
  });

  constructor(
    protected articleComposeService: ArticleComposeMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ articleCompose }) => {
      this.updateForm(articleCompose);
    });
  }

  updateForm(articleCompose: IArticleComposeMySuffix) {
    this.editForm.patchValue({
      id: articleCompose.id,
      techID: articleCompose.techID,
      remoteID: articleCompose.remoteID,
      nombre: articleCompose.nombre
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const articleCompose = this.createFromForm();
    if (articleCompose.id !== undefined) {
      this.subscribeToSaveResponse(this.articleComposeService.update(articleCompose));
    } else {
      this.subscribeToSaveResponse(this.articleComposeService.create(articleCompose));
    }
  }

  private createFromForm(): IArticleComposeMySuffix {
    return {
      ...new ArticleComposeMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      nombre: this.editForm.get(['nombre']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticleComposeMySuffix>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
