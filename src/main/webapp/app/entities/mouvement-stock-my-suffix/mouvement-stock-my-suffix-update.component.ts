import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IMouvementStockMySuffix, MouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';
import { MouvementStockMySuffixService } from './mouvement-stock-my-suffix.service';
import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';
import { ArticleMySuffixService } from 'app/entities/article-my-suffix';

@Component({
  selector: 'jhi-mouvement-stock-my-suffix-update',
  templateUrl: './mouvement-stock-my-suffix-update.component.html'
})
export class MouvementStockMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  articles: IArticleMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    quantiteTotal: [null, [Validators.required]],
    prixTotal: [null, [Validators.required]],
    prixHT: [null, [Validators.required]],
    tva: [null, [Validators.required]],
    validSup: [],
    validRes: [],
    estActif: [],
    type: [null, [Validators.required]],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    articles: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mouvementStockService: MouvementStockMySuffixService,
    protected articleService: ArticleMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mouvementStock }) => {
      this.updateForm(mouvementStock);
    });
    this.articleService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticleMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticleMySuffix[]>) => response.body)
      )
      .subscribe((res: IArticleMySuffix[]) => (this.articles = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mouvementStock: IMouvementStockMySuffix) {
    this.editForm.patchValue({
      id: mouvementStock.id,
      techID: mouvementStock.techID,
      remoteID: mouvementStock.remoteID,
      quantiteTotal: mouvementStock.quantiteTotal,
      prixTotal: mouvementStock.prixTotal,
      prixHT: mouvementStock.prixHT,
      tva: mouvementStock.tva,
      validSup: mouvementStock.validSup,
      validRes: mouvementStock.validRes,
      estActif: mouvementStock.estActif,
      type: mouvementStock.type,
      creeLe: mouvementStock.creeLe != null ? mouvementStock.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: mouvementStock.creePar,
      modifLe: mouvementStock.modifLe != null ? mouvementStock.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: mouvementStock.modifPar,
      articles: mouvementStock.articles
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mouvementStock = this.createFromForm();
    if (mouvementStock.id !== undefined) {
      this.subscribeToSaveResponse(this.mouvementStockService.update(mouvementStock));
    } else {
      this.subscribeToSaveResponse(this.mouvementStockService.create(mouvementStock));
    }
  }

  private createFromForm(): IMouvementStockMySuffix {
    return {
      ...new MouvementStockMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      quantiteTotal: this.editForm.get(['quantiteTotal']).value,
      prixTotal: this.editForm.get(['prixTotal']).value,
      prixHT: this.editForm.get(['prixHT']).value,
      tva: this.editForm.get(['tva']).value,
      validSup: this.editForm.get(['validSup']).value,
      validRes: this.editForm.get(['validRes']).value,
      estActif: this.editForm.get(['estActif']).value,
      type: this.editForm.get(['type']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      articles: this.editForm.get(['articles']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMouvementStockMySuffix>>) {
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

  trackArticleById(index: number, item: IArticleMySuffix) {
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
