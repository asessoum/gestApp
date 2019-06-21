import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ILangueMySuffix, LangueMySuffix } from 'app/shared/model/langue-my-suffix.model';
import { LangueMySuffixService } from './langue-my-suffix.service';
import { IPaysMySuffix } from 'app/shared/model/pays-my-suffix.model';
import { PaysMySuffixService } from 'app/entities/pays-my-suffix';
import { IFournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';
import { FournisseurMySuffixService } from 'app/entities/fournisseur-my-suffix';
import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';
import { EmployeMySuffixService } from 'app/entities/employe-my-suffix';

@Component({
  selector: 'jhi-langue-my-suffix-update',
  templateUrl: './langue-my-suffix-update.component.html'
})
export class LangueMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  pays: IPaysMySuffix[];

  fournisseurs: IFournisseurMySuffix[];

  employes: IEmployeMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    libelle: [null, [Validators.required, Validators.maxLength(20)]],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    paysId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected langueService: LangueMySuffixService,
    protected paysService: PaysMySuffixService,
    protected fournisseurService: FournisseurMySuffixService,
    protected employeService: EmployeMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ langue }) => {
      this.updateForm(langue);
    });
    this.paysService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPaysMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPaysMySuffix[]>) => response.body)
      )
      .subscribe((res: IPaysMySuffix[]) => (this.pays = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.fournisseurService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFournisseurMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFournisseurMySuffix[]>) => response.body)
      )
      .subscribe((res: IFournisseurMySuffix[]) => (this.fournisseurs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.employeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployeMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployeMySuffix[]>) => response.body)
      )
      .subscribe((res: IEmployeMySuffix[]) => (this.employes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(langue: ILangueMySuffix) {
    this.editForm.patchValue({
      id: langue.id,
      techID: langue.techID,
      remoteID: langue.remoteID,
      libelle: langue.libelle,
      estActif: langue.estActif,
      creeLe: langue.creeLe != null ? langue.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: langue.creePar,
      modifLe: langue.modifLe != null ? langue.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: langue.modifPar,
      paysId: langue.paysId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const langue = this.createFromForm();
    if (langue.id !== undefined) {
      this.subscribeToSaveResponse(this.langueService.update(langue));
    } else {
      this.subscribeToSaveResponse(this.langueService.create(langue));
    }
  }

  private createFromForm(): ILangueMySuffix {
    return {
      ...new LangueMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      libelle: this.editForm.get(['libelle']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      paysId: this.editForm.get(['paysId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILangueMySuffix>>) {
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

  trackFournisseurById(index: number, item: IFournisseurMySuffix) {
    return item.id;
  }

  trackEmployeById(index: number, item: IEmployeMySuffix) {
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
