import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IReductionMySuffix, ReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';
import { ReductionMySuffixService } from './reduction-my-suffix.service';

@Component({
  selector: 'jhi-reduction-my-suffix-update',
  templateUrl: './reduction-my-suffix-update.component.html'
})
export class ReductionMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    libelle: [null, [Validators.required]],
    typeReduction: [null, [Validators.required]],
    valeurReduction: [null, [Validators.required]],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: []
  });

  constructor(protected reductionService: ReductionMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reduction }) => {
      this.updateForm(reduction);
    });
  }

  updateForm(reduction: IReductionMySuffix) {
    this.editForm.patchValue({
      id: reduction.id,
      techID: reduction.techID,
      remoteID: reduction.remoteID,
      libelle: reduction.libelle,
      typeReduction: reduction.typeReduction,
      valeurReduction: reduction.valeurReduction,
      estActif: reduction.estActif,
      creeLe: reduction.creeLe != null ? reduction.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: reduction.creePar,
      modifLe: reduction.modifLe != null ? reduction.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: reduction.modifPar
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reduction = this.createFromForm();
    if (reduction.id !== undefined) {
      this.subscribeToSaveResponse(this.reductionService.update(reduction));
    } else {
      this.subscribeToSaveResponse(this.reductionService.create(reduction));
    }
  }

  private createFromForm(): IReductionMySuffix {
    return {
      ...new ReductionMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      libelle: this.editForm.get(['libelle']).value,
      typeReduction: this.editForm.get(['typeReduction']).value,
      valeurReduction: this.editForm.get(['valeurReduction']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReductionMySuffix>>) {
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
