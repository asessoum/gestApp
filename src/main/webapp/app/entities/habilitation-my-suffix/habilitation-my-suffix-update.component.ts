import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IHabilitationMySuffix, HabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';
import { HabilitationMySuffixService } from './habilitation-my-suffix.service';

@Component({
  selector: 'jhi-habilitation-my-suffix-update',
  templateUrl: './habilitation-my-suffix-update.component.html'
})
export class HabilitationMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    profile: [null, [Validators.required, Validators.maxLength(15)]],
    ressource: [null, [Validators.required, Validators.maxLength(50)]],
    permission: [null, [Validators.required, Validators.maxLength(10)]],
    acces: [null, [Validators.required, Validators.maxLength(2)]]
  });

  constructor(
    protected habilitationService: HabilitationMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ habilitation }) => {
      this.updateForm(habilitation);
    });
  }

  updateForm(habilitation: IHabilitationMySuffix) {
    this.editForm.patchValue({
      id: habilitation.id,
      techID: habilitation.techID,
      remoteID: habilitation.remoteID,
      profile: habilitation.profile,
      ressource: habilitation.ressource,
      permission: habilitation.permission,
      acces: habilitation.acces
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const habilitation = this.createFromForm();
    if (habilitation.id !== undefined) {
      this.subscribeToSaveResponse(this.habilitationService.update(habilitation));
    } else {
      this.subscribeToSaveResponse(this.habilitationService.create(habilitation));
    }
  }

  private createFromForm(): IHabilitationMySuffix {
    return {
      ...new HabilitationMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      profile: this.editForm.get(['profile']).value,
      ressource: this.editForm.get(['ressource']).value,
      permission: this.editForm.get(['permission']).value,
      acces: this.editForm.get(['acces']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHabilitationMySuffix>>) {
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
