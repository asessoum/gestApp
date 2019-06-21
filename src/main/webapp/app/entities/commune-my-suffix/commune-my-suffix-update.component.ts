import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICommuneMySuffix, CommuneMySuffix } from 'app/shared/model/commune-my-suffix.model';
import { CommuneMySuffixService } from './commune-my-suffix.service';
import { IPaysMySuffix } from 'app/shared/model/pays-my-suffix.model';
import { PaysMySuffixService } from 'app/entities/pays-my-suffix';

@Component({
  selector: 'jhi-commune-my-suffix-update',
  templateUrl: './commune-my-suffix-update.component.html'
})
export class CommuneMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  pays: IPaysMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    nomCommune: [null, [Validators.required, Validators.maxLength(20)]],
    nomProvince: [null, [Validators.maxLength(20)]],
    nomRegion: [null, [Validators.maxLength(20)]],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    paysId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected communeService: CommuneMySuffixService,
    protected paysService: PaysMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ commune }) => {
      this.updateForm(commune);
    });
    this.paysService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPaysMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPaysMySuffix[]>) => response.body)
      )
      .subscribe((res: IPaysMySuffix[]) => (this.pays = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(commune: ICommuneMySuffix) {
    this.editForm.patchValue({
      id: commune.id,
      techID: commune.techID,
      remoteID: commune.remoteID,
      nomCommune: commune.nomCommune,
      nomProvince: commune.nomProvince,
      nomRegion: commune.nomRegion,
      estActif: commune.estActif,
      creeLe: commune.creeLe != null ? commune.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: commune.creePar,
      modifLe: commune.modifLe != null ? commune.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: commune.modifPar,
      paysId: commune.paysId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const commune = this.createFromForm();
    if (commune.id !== undefined) {
      this.subscribeToSaveResponse(this.communeService.update(commune));
    } else {
      this.subscribeToSaveResponse(this.communeService.create(commune));
    }
  }

  private createFromForm(): ICommuneMySuffix {
    return {
      ...new CommuneMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      nomCommune: this.editForm.get(['nomCommune']).value,
      nomProvince: this.editForm.get(['nomProvince']).value,
      nomRegion: this.editForm.get(['nomRegion']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      paysId: this.editForm.get(['paysId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommuneMySuffix>>) {
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

  trackPaysById(index: number, item: IPaysMySuffix) {
    return item.id;
  }
}
