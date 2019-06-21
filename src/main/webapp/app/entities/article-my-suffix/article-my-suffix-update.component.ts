import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IArticleMySuffix, ArticleMySuffix } from 'app/shared/model/article-my-suffix.model';
import { ArticleMySuffixService } from './article-my-suffix.service';
import { ICategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';
import { CategorieMySuffixService } from 'app/entities/categorie-my-suffix';
import { IReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';
import { ReductionMySuffixService } from 'app/entities/reduction-my-suffix';
import { IFournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';
import { FournisseurMySuffixService } from 'app/entities/fournisseur-my-suffix';
import { IArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';
import { ArticleComposeMySuffixService } from 'app/entities/article-compose-my-suffix';
import { IStockMySuffix } from 'app/shared/model/stock-my-suffix.model';
import { StockMySuffixService } from 'app/entities/stock-my-suffix';
import { IMouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';
import { MouvementStockMySuffixService } from 'app/entities/mouvement-stock-my-suffix';

@Component({
  selector: 'jhi-article-my-suffix-update',
  templateUrl: './article-my-suffix-update.component.html'
})
export class ArticleMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  categories: ICategorieMySuffix[];

  reductions: IReductionMySuffix[];

  fournisseurs: IFournisseurMySuffix[];

  articlecomposes: IArticleComposeMySuffix[];

  stocks: IStockMySuffix[];

  mouvementstocks: IMouvementStockMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    libelle: [null, [Validators.required, Validators.maxLength(20)]],
    description: [null, [Validators.maxLength(200)]],
    prixDeVente: [],
    prixDeRevient: [],
    margeBrute: [],
    estCompose: [null, [Validators.required]],
    uniteVente: [null, [Validators.required]],
    pourcentageTva: [],
    codeBarre: [],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    categorieId: [],
    reductionId: [],
    fournisseurId: [],
    compositionId: [],
    stockId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected articleService: ArticleMySuffixService,
    protected categorieService: CategorieMySuffixService,
    protected reductionService: ReductionMySuffixService,
    protected fournisseurService: FournisseurMySuffixService,
    protected articleComposeService: ArticleComposeMySuffixService,
    protected stockService: StockMySuffixService,
    protected mouvementStockService: MouvementStockMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ article }) => {
      this.updateForm(article);
    });
    this.categorieService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategorieMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategorieMySuffix[]>) => response.body)
      )
      .subscribe((res: ICategorieMySuffix[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.reductionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IReductionMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IReductionMySuffix[]>) => response.body)
      )
      .subscribe((res: IReductionMySuffix[]) => (this.reductions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.fournisseurService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFournisseurMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFournisseurMySuffix[]>) => response.body)
      )
      .subscribe((res: IFournisseurMySuffix[]) => (this.fournisseurs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.articleComposeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticleComposeMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticleComposeMySuffix[]>) => response.body)
      )
      .subscribe((res: IArticleComposeMySuffix[]) => (this.articlecomposes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.stockService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStockMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStockMySuffix[]>) => response.body)
      )
      .subscribe((res: IStockMySuffix[]) => (this.stocks = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.mouvementStockService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMouvementStockMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMouvementStockMySuffix[]>) => response.body)
      )
      .subscribe((res: IMouvementStockMySuffix[]) => (this.mouvementstocks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(article: IArticleMySuffix) {
    this.editForm.patchValue({
      id: article.id,
      techID: article.techID,
      remoteID: article.remoteID,
      libelle: article.libelle,
      description: article.description,
      prixDeVente: article.prixDeVente,
      prixDeRevient: article.prixDeRevient,
      margeBrute: article.margeBrute,
      estCompose: article.estCompose,
      uniteVente: article.uniteVente,
      pourcentageTva: article.pourcentageTva,
      codeBarre: article.codeBarre,
      estActif: article.estActif,
      creeLe: article.creeLe != null ? article.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: article.creePar,
      modifLe: article.modifLe != null ? article.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: article.modifPar,
      categorieId: article.categorieId,
      reductionId: article.reductionId,
      fournisseurId: article.fournisseurId,
      compositionId: article.compositionId,
      stockId: article.stockId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const article = this.createFromForm();
    if (article.id !== undefined) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  private createFromForm(): IArticleMySuffix {
    return {
      ...new ArticleMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      libelle: this.editForm.get(['libelle']).value,
      description: this.editForm.get(['description']).value,
      prixDeVente: this.editForm.get(['prixDeVente']).value,
      prixDeRevient: this.editForm.get(['prixDeRevient']).value,
      margeBrute: this.editForm.get(['margeBrute']).value,
      estCompose: this.editForm.get(['estCompose']).value,
      uniteVente: this.editForm.get(['uniteVente']).value,
      pourcentageTva: this.editForm.get(['pourcentageTva']).value,
      codeBarre: this.editForm.get(['codeBarre']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      categorieId: this.editForm.get(['categorieId']).value,
      reductionId: this.editForm.get(['reductionId']).value,
      fournisseurId: this.editForm.get(['fournisseurId']).value,
      compositionId: this.editForm.get(['compositionId']).value,
      stockId: this.editForm.get(['stockId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticleMySuffix>>) {
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

  trackCategorieById(index: number, item: ICategorieMySuffix) {
    return item.id;
  }

  trackReductionById(index: number, item: IReductionMySuffix) {
    return item.id;
  }

  trackFournisseurById(index: number, item: IFournisseurMySuffix) {
    return item.id;
  }

  trackArticleComposeById(index: number, item: IArticleComposeMySuffix) {
    return item.id;
  }

  trackStockById(index: number, item: IStockMySuffix) {
    return item.id;
  }

  trackMouvementStockById(index: number, item: IMouvementStockMySuffix) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
