import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IClientMySuffix, ClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from './client-my-suffix.service';
import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';
import { LangueMySuffixService } from 'app/entities/langue-my-suffix';
import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';
import { EmployeMySuffixService } from 'app/entities/employe-my-suffix';
import { IAdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';
import { AdresseMySuffixService } from 'app/entities/adresse-my-suffix';

@Component({
  selector: 'jhi-client-my-suffix-update',
  templateUrl: './client-my-suffix-update.component.html'
})
export class ClientMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  langues: ILangueMySuffix[];

  employes: IEmployeMySuffix[];

  adresses: IAdresseMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    nom: [null, [Validators.required, Validators.maxLength(20)]],
    prenom: [null, [Validators.required, Validators.maxLength(20)]],
    naissance: [null, [Validators.required]],
    genre: [null, [Validators.required]],
    numCarteCli: [null, [Validators.required, Validators.maxLength(20)]],
    dCarteUtil: [null, [Validators.required]],
    tel: [null, [Validators.required, Validators.maxLength(10)]],
    email: [null, [Validators.maxLength(50)]],
    photoID: [null, [Validators.maxLength(200)]],
    description: [null, [Validators.maxLength(500)]],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    langueId: [],
    commercialId: [],
    adresses: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected clientService: ClientMySuffixService,
    protected langueService: LangueMySuffixService,
    protected employeService: EmployeMySuffixService,
    protected adresseService: AdresseMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);
    });
    this.langueService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILangueMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILangueMySuffix[]>) => response.body)
      )
      .subscribe((res: ILangueMySuffix[]) => (this.langues = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.employeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployeMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployeMySuffix[]>) => response.body)
      )
      .subscribe((res: IEmployeMySuffix[]) => (this.employes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.adresseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAdresseMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAdresseMySuffix[]>) => response.body)
      )
      .subscribe((res: IAdresseMySuffix[]) => (this.adresses = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(client: IClientMySuffix) {
    this.editForm.patchValue({
      id: client.id,
      techID: client.techID,
      remoteID: client.remoteID,
      nom: client.nom,
      prenom: client.prenom,
      naissance: client.naissance != null ? client.naissance.format(DATE_TIME_FORMAT) : null,
      genre: client.genre,
      numCarteCli: client.numCarteCli,
      dCarteUtil: client.dCarteUtil != null ? client.dCarteUtil.format(DATE_TIME_FORMAT) : null,
      tel: client.tel,
      email: client.email,
      photoID: client.photoID,
      description: client.description,
      estActif: client.estActif,
      creeLe: client.creeLe != null ? client.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: client.creePar,
      modifLe: client.modifLe != null ? client.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: client.modifPar,
      langueId: client.langueId,
      commercialId: client.commercialId,
      adresses: client.adresses
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  private createFromForm(): IClientMySuffix {
    return {
      ...new ClientMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      nom: this.editForm.get(['nom']).value,
      prenom: this.editForm.get(['prenom']).value,
      naissance:
        this.editForm.get(['naissance']).value != null ? moment(this.editForm.get(['naissance']).value, DATE_TIME_FORMAT) : undefined,
      genre: this.editForm.get(['genre']).value,
      numCarteCli: this.editForm.get(['numCarteCli']).value,
      dCarteUtil:
        this.editForm.get(['dCarteUtil']).value != null ? moment(this.editForm.get(['dCarteUtil']).value, DATE_TIME_FORMAT) : undefined,
      tel: this.editForm.get(['tel']).value,
      email: this.editForm.get(['email']).value,
      photoID: this.editForm.get(['photoID']).value,
      description: this.editForm.get(['description']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      langueId: this.editForm.get(['langueId']).value,
      commercialId: this.editForm.get(['commercialId']).value,
      adresses: this.editForm.get(['adresses']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClientMySuffix>>) {
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

  trackEmployeById(index: number, item: IEmployeMySuffix) {
    return item.id;
  }

  trackAdresseById(index: number, item: IAdresseMySuffix) {
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
