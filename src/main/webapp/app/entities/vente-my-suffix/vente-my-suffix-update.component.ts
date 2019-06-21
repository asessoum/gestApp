import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IVenteMySuffix, VenteMySuffix } from 'app/shared/model/vente-my-suffix.model';
import { VenteMySuffixService } from './vente-my-suffix.service';
import { ICommandeMySuffix } from 'app/shared/model/commande-my-suffix.model';
import { CommandeMySuffixService } from 'app/entities/commande-my-suffix';
import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';
import { ArticleMySuffixService } from 'app/entities/article-my-suffix';

@Component({
  selector: 'jhi-vente-my-suffix-update',
  templateUrl: './vente-my-suffix-update.component.html'
})
export class VenteMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  commandes: ICommandeMySuffix[];

  articles: IArticleMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    quantite: [null, [Validators.required]],
    prixVente: [null, [Validators.required]],
    margeVente: [null, [Validators.required]],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    commandeId: [],
    articleId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected venteService: VenteMySuffixService,
    protected commandeService: CommandeMySuffixService,
    protected articleService: ArticleMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ vente }) => {
      this.updateForm(vente);
    });
    this.commandeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICommandeMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICommandeMySuffix[]>) => response.body)
      )
      .subscribe((res: ICommandeMySuffix[]) => (this.commandes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.articleService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticleMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticleMySuffix[]>) => response.body)
      )
      .subscribe((res: IArticleMySuffix[]) => (this.articles = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(vente: IVenteMySuffix) {
    this.editForm.patchValue({
      id: vente.id,
      techID: vente.techID,
      remoteID: vente.remoteID,
      quantite: vente.quantite,
      prixVente: vente.prixVente,
      margeVente: vente.margeVente,
      creeLe: vente.creeLe != null ? vente.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: vente.creePar,
      modifLe: vente.modifLe != null ? vente.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: vente.modifPar,
      commandeId: vente.commandeId,
      articleId: vente.articleId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const vente = this.createFromForm();
    if (vente.id !== undefined) {
      this.subscribeToSaveResponse(this.venteService.update(vente));
    } else {
      this.subscribeToSaveResponse(this.venteService.create(vente));
    }
  }

  private createFromForm(): IVenteMySuffix {
    return {
      ...new VenteMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      quantite: this.editForm.get(['quantite']).value,
      prixVente: this.editForm.get(['prixVente']).value,
      margeVente: this.editForm.get(['margeVente']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      commandeId: this.editForm.get(['commandeId']).value,
      articleId: this.editForm.get(['articleId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVenteMySuffix>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCommandeById(index: number, item: ICommandeMySuffix) {
    return item.id;
  }

  trackArticleById(index: number, item: IArticleMySuffix) {
    return item.id;
  }
}
