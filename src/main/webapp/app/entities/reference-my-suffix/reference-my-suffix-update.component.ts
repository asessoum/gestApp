import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IReferenceMySuffix, ReferenceMySuffix } from 'app/shared/model/reference-my-suffix.model';
import { ReferenceMySuffixService } from './reference-my-suffix.service';

@Component({
  selector: 'jhi-reference-my-suffix-update',
  templateUrl: './reference-my-suffix-update.component.html'
})
export class ReferenceMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    libelleRef: [null, [Validators.required, Validators.maxLength(10)]],
    valeurRef: [null, [Validators.required, Validators.maxLength(100)]],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: []
  });

  constructor(protected referenceService: ReferenceMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reference }) => {
      this.updateForm(reference);
    });
  }

  updateForm(reference: IReferenceMySuffix) {
    this.editForm.patchValue({
      id: reference.id,
      techID: reference.techID,
      remoteID: reference.remoteID,
      libelleRef: reference.libelleRef,
      valeurRef: reference.valeurRef,
      estActif: reference.estActif,
      creeLe: reference.creeLe != null ? reference.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: reference.creePar,
      modifLe: reference.modifLe != null ? reference.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: reference.modifPar
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reference = this.createFromForm();
    if (reference.id !== undefined) {
      this.subscribeToSaveResponse(this.referenceService.update(reference));
    } else {
      this.subscribeToSaveResponse(this.referenceService.create(reference));
    }
  }

  private createFromForm(): IReferenceMySuffix {
    return {
      ...new ReferenceMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      libelleRef: this.editForm.get(['libelleRef']).value,
      valeurRef: this.editForm.get(['valeurRef']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReferenceMySuffix>>) {
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
