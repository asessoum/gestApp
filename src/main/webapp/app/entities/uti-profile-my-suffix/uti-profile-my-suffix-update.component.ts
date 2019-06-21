import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IUtiProfileMySuffix, UtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';
import { UtiProfileMySuffixService } from './uti-profile-my-suffix.service';
import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';
import { EmployeMySuffixService } from 'app/entities/employe-my-suffix';
import { IProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';
import { ProfileMySuffixService } from 'app/entities/profile-my-suffix';

@Component({
  selector: 'jhi-uti-profile-my-suffix-update',
  templateUrl: './uti-profile-my-suffix-update.component.html'
})
export class UtiProfileMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  employes: IEmployeMySuffix[];

  profiles: IProfileMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    employeId: [],
    profileId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected utiProfileService: UtiProfileMySuffixService,
    protected employeService: EmployeMySuffixService,
    protected profileService: ProfileMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ utiProfile }) => {
      this.updateForm(utiProfile);
    });
    this.employeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployeMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployeMySuffix[]>) => response.body)
      )
      .subscribe((res: IEmployeMySuffix[]) => (this.employes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.profileService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProfileMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProfileMySuffix[]>) => response.body)
      )
      .subscribe((res: IProfileMySuffix[]) => (this.profiles = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(utiProfile: IUtiProfileMySuffix) {
    this.editForm.patchValue({
      id: utiProfile.id,
      techID: utiProfile.techID,
      remoteID: utiProfile.remoteID,
      estActif: utiProfile.estActif,
      creeLe: utiProfile.creeLe != null ? utiProfile.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: utiProfile.creePar,
      modifLe: utiProfile.modifLe != null ? utiProfile.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: utiProfile.modifPar,
      employeId: utiProfile.employeId,
      profileId: utiProfile.profileId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const utiProfile = this.createFromForm();
    if (utiProfile.id !== undefined) {
      this.subscribeToSaveResponse(this.utiProfileService.update(utiProfile));
    } else {
      this.subscribeToSaveResponse(this.utiProfileService.create(utiProfile));
    }
  }

  private createFromForm(): IUtiProfileMySuffix {
    return {
      ...new UtiProfileMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      employeId: this.editForm.get(['employeId']).value,
      profileId: this.editForm.get(['profileId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUtiProfileMySuffix>>) {
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

  trackEmployeById(index: number, item: IEmployeMySuffix) {
    return item.id;
  }

  trackProfileById(index: number, item: IProfileMySuffix) {
    return item.id;
  }
}
