import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IUtilisateurMySuffix, UtilisateurMySuffix } from 'app/shared/model/utilisateur-my-suffix.model';
import { UtilisateurMySuffixService } from './utilisateur-my-suffix.service';
import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';
import { EmployeMySuffixService } from 'app/entities/employe-my-suffix';

@Component({
  selector: 'jhi-utilisateur-my-suffix-update',
  templateUrl: './utilisateur-my-suffix-update.component.html'
})
export class UtilisateurMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  employes: IEmployeMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    login: [null, [Validators.required, Validators.maxLength(6)]],
    mdp: [null, [Validators.required]],
    nom: [null, [Validators.required, Validators.maxLength(20)]],
    prenom: [null, [Validators.required, Validators.maxLength(20)]],
    dateNaissance: [null, [Validators.required]],
    telephone: [null, [Validators.maxLength(15)]],
    email: [null, [Validators.maxLength(100)]],
    dateMajMdp: [],
    statusConnexion: [],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected utilisateurService: UtilisateurMySuffixService,
    protected employeService: EmployeMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ utilisateur }) => {
      this.updateForm(utilisateur);
    });
    this.employeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployeMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployeMySuffix[]>) => response.body)
      )
      .subscribe((res: IEmployeMySuffix[]) => (this.employes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(utilisateur: IUtilisateurMySuffix) {
    this.editForm.patchValue({
      id: utilisateur.id,
      techID: utilisateur.techID,
      remoteID: utilisateur.remoteID,
      login: utilisateur.login,
      mdp: utilisateur.mdp,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      dateNaissance: utilisateur.dateNaissance != null ? utilisateur.dateNaissance.format(DATE_TIME_FORMAT) : null,
      telephone: utilisateur.telephone,
      email: utilisateur.email,
      dateMajMdp: utilisateur.dateMajMdp != null ? utilisateur.dateMajMdp.format(DATE_TIME_FORMAT) : null,
      statusConnexion: utilisateur.statusConnexion,
      estActif: utilisateur.estActif,
      creeLe: utilisateur.creeLe != null ? utilisateur.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: utilisateur.creePar,
      modifLe: utilisateur.modifLe != null ? utilisateur.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: utilisateur.modifPar
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const utilisateur = this.createFromForm();
    if (utilisateur.id !== undefined) {
      this.subscribeToSaveResponse(this.utilisateurService.update(utilisateur));
    } else {
      this.subscribeToSaveResponse(this.utilisateurService.create(utilisateur));
    }
  }

  private createFromForm(): IUtilisateurMySuffix {
    return {
      ...new UtilisateurMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      login: this.editForm.get(['login']).value,
      mdp: this.editForm.get(['mdp']).value,
      nom: this.editForm.get(['nom']).value,
      prenom: this.editForm.get(['prenom']).value,
      dateNaissance:
        this.editForm.get(['dateNaissance']).value != null
          ? moment(this.editForm.get(['dateNaissance']).value, DATE_TIME_FORMAT)
          : undefined,
      telephone: this.editForm.get(['telephone']).value,
      email: this.editForm.get(['email']).value,
      dateMajMdp:
        this.editForm.get(['dateMajMdp']).value != null ? moment(this.editForm.get(['dateMajMdp']).value, DATE_TIME_FORMAT) : undefined,
      statusConnexion: this.editForm.get(['statusConnexion']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUtilisateurMySuffix>>) {
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
}
