import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IEmployeMySuffix, EmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';
import { EmployeMySuffixService } from './employe-my-suffix.service';
import { IUtilisateurMySuffix } from 'app/shared/model/utilisateur-my-suffix.model';
import { UtilisateurMySuffixService } from 'app/entities/utilisateur-my-suffix';
import { IPartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { PartenaireMySuffixService } from 'app/entities/partenaire-my-suffix';
import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';
import { LangueMySuffixService } from 'app/entities/langue-my-suffix';

@Component({
  selector: 'jhi-employe-my-suffix-update',
  templateUrl: './employe-my-suffix-update.component.html'
})
export class EmployeMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  utilisateurs: IUtilisateurMySuffix[];

  partenaires: IPartenaireMySuffix[];

  langues: ILangueMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    genre: [null, [Validators.required]],
    numCarteUti: [null, [Validators.required, Validators.maxLength(20)]],
    dateCarteUti: [],
    photoID: [null, [Validators.maxLength(200)]],
    description: [null, [Validators.maxLength(500)]],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    utilisateurId: [],
    responsableId: [],
    langues: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected employeService: EmployeMySuffixService,
    protected utilisateurService: UtilisateurMySuffixService,
    protected partenaireService: PartenaireMySuffixService,
    protected langueService: LangueMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ employe }) => {
      this.updateForm(employe);
    });
    this.utilisateurService
      .query({ filter: 'employe-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IUtilisateurMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUtilisateurMySuffix[]>) => response.body)
      )
      .subscribe(
        (res: IUtilisateurMySuffix[]) => {
          if (!!this.editForm.get('utilisateurId').value) {
            this.utilisateurs = res;
          } else {
            this.utilisateurService
              .find(this.editForm.get('utilisateurId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IUtilisateurMySuffix>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IUtilisateurMySuffix>) => subResponse.body)
              )
              .subscribe(
                (subRes: IUtilisateurMySuffix) => (this.utilisateurs = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.partenaireService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPartenaireMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPartenaireMySuffix[]>) => response.body)
      )
      .subscribe((res: IPartenaireMySuffix[]) => (this.partenaires = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.langueService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILangueMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILangueMySuffix[]>) => response.body)
      )
      .subscribe((res: ILangueMySuffix[]) => (this.langues = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(employe: IEmployeMySuffix) {
    this.editForm.patchValue({
      id: employe.id,
      techID: employe.techID,
      remoteID: employe.remoteID,
      genre: employe.genre,
      numCarteUti: employe.numCarteUti,
      dateCarteUti: employe.dateCarteUti != null ? employe.dateCarteUti.format(DATE_TIME_FORMAT) : null,
      photoID: employe.photoID,
      description: employe.description,
      estActif: employe.estActif,
      creeLe: employe.creeLe != null ? employe.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: employe.creePar,
      modifLe: employe.modifLe != null ? employe.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: employe.modifPar,
      utilisateurId: employe.utilisateurId,
      responsableId: employe.responsableId,
      langues: employe.langues
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const employe = this.createFromForm();
    if (employe.id !== undefined) {
      this.subscribeToSaveResponse(this.employeService.update(employe));
    } else {
      this.subscribeToSaveResponse(this.employeService.create(employe));
    }
  }

  private createFromForm(): IEmployeMySuffix {
    return {
      ...new EmployeMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      genre: this.editForm.get(['genre']).value,
      numCarteUti: this.editForm.get(['numCarteUti']).value,
      dateCarteUti:
        this.editForm.get(['dateCarteUti']).value != null ? moment(this.editForm.get(['dateCarteUti']).value, DATE_TIME_FORMAT) : undefined,
      photoID: this.editForm.get(['photoID']).value,
      description: this.editForm.get(['description']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      utilisateurId: this.editForm.get(['utilisateurId']).value,
      responsableId: this.editForm.get(['responsableId']).value,
      langues: this.editForm.get(['langues']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeMySuffix>>) {
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

  trackUtilisateurById(index: number, item: IUtilisateurMySuffix) {
    return item.id;
  }

  trackPartenaireById(index: number, item: IPartenaireMySuffix) {
    return item.id;
  }

  trackLangueById(index: number, item: ILangueMySuffix) {
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
