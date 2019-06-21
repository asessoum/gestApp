import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IFournisseurMySuffix, FournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';
import { FournisseurMySuffixService } from './fournisseur-my-suffix.service';
import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';
import { LangueMySuffixService } from 'app/entities/langue-my-suffix';

@Component({
  selector: 'jhi-fournisseur-my-suffix-update',
  templateUrl: './fournisseur-my-suffix-update.component.html'
})
export class FournisseurMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  langues: ILangueMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    nomFournisseur: [null, [Validators.required, Validators.maxLength(200)]],
    tel: [null, [Validators.required, Validators.maxLength(10)]],
    email: [null, [Validators.maxLength(50)]],
    siteWeb: [null, [Validators.maxLength(50)]],
    logo: [null, [Validators.maxLength(200)]],
    description: [null, [Validators.maxLength(500)]],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    langues: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected fournisseurService: FournisseurMySuffixService,
    protected langueService: LangueMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ fournisseur }) => {
      this.updateForm(fournisseur);
    });
    this.langueService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILangueMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILangueMySuffix[]>) => response.body)
      )
      .subscribe((res: ILangueMySuffix[]) => (this.langues = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(fournisseur: IFournisseurMySuffix) {
    this.editForm.patchValue({
      id: fournisseur.id,
      techID: fournisseur.techID,
      remoteID: fournisseur.remoteID,
      nomFournisseur: fournisseur.nomFournisseur,
      tel: fournisseur.tel,
      email: fournisseur.email,
      siteWeb: fournisseur.siteWeb,
      logo: fournisseur.logo,
      description: fournisseur.description,
      estActif: fournisseur.estActif,
      creeLe: fournisseur.creeLe != null ? fournisseur.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: fournisseur.creePar,
      modifLe: fournisseur.modifLe != null ? fournisseur.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: fournisseur.modifPar,
      langues: fournisseur.langues
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const fournisseur = this.createFromForm();
    if (fournisseur.id !== undefined) {
      this.subscribeToSaveResponse(this.fournisseurService.update(fournisseur));
    } else {
      this.subscribeToSaveResponse(this.fournisseurService.create(fournisseur));
    }
  }

  private createFromForm(): IFournisseurMySuffix {
    return {
      ...new FournisseurMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      nomFournisseur: this.editForm.get(['nomFournisseur']).value,
      tel: this.editForm.get(['tel']).value,
      email: this.editForm.get(['email']).value,
      siteWeb: this.editForm.get(['siteWeb']).value,
      logo: this.editForm.get(['logo']).value,
      description: this.editForm.get(['description']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      langues: this.editForm.get(['langues']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFournisseurMySuffix>>) {
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
