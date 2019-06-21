import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAdresseMySuffix, AdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';
import { AdresseMySuffixService } from './adresse-my-suffix.service';
import { IFournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';
import { FournisseurMySuffixService } from 'app/entities/fournisseur-my-suffix';
import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';
import { EmployeMySuffixService } from 'app/entities/employe-my-suffix';
import { ICommuneMySuffix } from 'app/shared/model/commune-my-suffix.model';
import { CommuneMySuffixService } from 'app/entities/commune-my-suffix';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from 'app/entities/client-my-suffix';

@Component({
  selector: 'jhi-adresse-my-suffix-update',
  templateUrl: './adresse-my-suffix-update.component.html'
})
export class AdresseMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  fournisseurs: IFournisseurMySuffix[];

  employes: IEmployeMySuffix[];

  communes: ICommuneMySuffix[];

  clients: IClientMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    numeroRue: [],
    nomRue: [],
    complement: [],
    fournisseurId: [],
    utilisateurId: [],
    communeId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected adresseService: AdresseMySuffixService,
    protected fournisseurService: FournisseurMySuffixService,
    protected employeService: EmployeMySuffixService,
    protected communeService: CommuneMySuffixService,
    protected clientService: ClientMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ adresse }) => {
      this.updateForm(adresse);
    });
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
    this.communeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICommuneMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICommuneMySuffix[]>) => response.body)
      )
      .subscribe((res: ICommuneMySuffix[]) => (this.communes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.clientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClientMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClientMySuffix[]>) => response.body)
      )
      .subscribe((res: IClientMySuffix[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(adresse: IAdresseMySuffix) {
    this.editForm.patchValue({
      id: adresse.id,
      techID: adresse.techID,
      remoteID: adresse.remoteID,
      numeroRue: adresse.numeroRue,
      nomRue: adresse.nomRue,
      complement: adresse.complement,
      fournisseurId: adresse.fournisseurId,
      utilisateurId: adresse.utilisateurId,
      communeId: adresse.communeId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const adresse = this.createFromForm();
    if (adresse.id !== undefined) {
      this.subscribeToSaveResponse(this.adresseService.update(adresse));
    } else {
      this.subscribeToSaveResponse(this.adresseService.create(adresse));
    }
  }

  private createFromForm(): IAdresseMySuffix {
    return {
      ...new AdresseMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      numeroRue: this.editForm.get(['numeroRue']).value,
      nomRue: this.editForm.get(['nomRue']).value,
      complement: this.editForm.get(['complement']).value,
      fournisseurId: this.editForm.get(['fournisseurId']).value,
      utilisateurId: this.editForm.get(['utilisateurId']).value,
      communeId: this.editForm.get(['communeId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdresseMySuffix>>) {
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

  trackFournisseurById(index: number, item: IFournisseurMySuffix) {
    return item.id;
  }

  trackEmployeById(index: number, item: IEmployeMySuffix) {
    return item.id;
  }

  trackCommuneById(index: number, item: ICommuneMySuffix) {
    return item.id;
  }

  trackClientById(index: number, item: IClientMySuffix) {
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
