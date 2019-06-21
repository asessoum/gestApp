import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICommandeMySuffix, CommandeMySuffix } from 'app/shared/model/commande-my-suffix.model';
import { CommandeMySuffixService } from './commande-my-suffix.service';
import { IFactureMySuffix } from 'app/shared/model/facture-my-suffix.model';
import { FactureMySuffixService } from 'app/entities/facture-my-suffix';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from 'app/entities/client-my-suffix';
import { IEmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';
import { EmployeMySuffixService } from 'app/entities/employe-my-suffix';

@Component({
  selector: 'jhi-commande-my-suffix-update',
  templateUrl: './commande-my-suffix-update.component.html'
})
export class CommandeMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  factures: IFactureMySuffix[];

  clients: IClientMySuffix[];

  employes: IEmployeMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    quantiteTotal: [null, [Validators.required]],
    prixTotalCommande: [null, [Validators.required]],
    prixHT: [null, [Validators.required]],
    tva: [null, [Validators.required]],
    validSup: [],
    validRes: [],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    factureId: [],
    clientId: [],
    commercialId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected commandeService: CommandeMySuffixService,
    protected factureService: FactureMySuffixService,
    protected clientService: ClientMySuffixService,
    protected employeService: EmployeMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ commande }) => {
      this.updateForm(commande);
    });
    this.factureService
      .query({ filter: 'commande-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IFactureMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFactureMySuffix[]>) => response.body)
      )
      .subscribe(
        (res: IFactureMySuffix[]) => {
          if (!!this.editForm.get('factureId').value) {
            this.factures = res;
          } else {
            this.factureService
              .find(this.editForm.get('factureId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IFactureMySuffix>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IFactureMySuffix>) => subResponse.body)
              )
              .subscribe(
                (subRes: IFactureMySuffix) => (this.factures = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.clientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClientMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClientMySuffix[]>) => response.body)
      )
      .subscribe((res: IClientMySuffix[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.employeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployeMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployeMySuffix[]>) => response.body)
      )
      .subscribe((res: IEmployeMySuffix[]) => (this.employes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(commande: ICommandeMySuffix) {
    this.editForm.patchValue({
      id: commande.id,
      techID: commande.techID,
      remoteID: commande.remoteID,
      quantiteTotal: commande.quantiteTotal,
      prixTotalCommande: commande.prixTotalCommande,
      prixHT: commande.prixHT,
      tva: commande.tva,
      validSup: commande.validSup,
      validRes: commande.validRes,
      estActif: commande.estActif,
      creeLe: commande.creeLe != null ? commande.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: commande.creePar,
      modifLe: commande.modifLe != null ? commande.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: commande.modifPar,
      factureId: commande.factureId,
      clientId: commande.clientId,
      commercialId: commande.commercialId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const commande = this.createFromForm();
    if (commande.id !== undefined) {
      this.subscribeToSaveResponse(this.commandeService.update(commande));
    } else {
      this.subscribeToSaveResponse(this.commandeService.create(commande));
    }
  }

  private createFromForm(): ICommandeMySuffix {
    return {
      ...new CommandeMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      quantiteTotal: this.editForm.get(['quantiteTotal']).value,
      prixTotalCommande: this.editForm.get(['prixTotalCommande']).value,
      prixHT: this.editForm.get(['prixHT']).value,
      tva: this.editForm.get(['tva']).value,
      validSup: this.editForm.get(['validSup']).value,
      validRes: this.editForm.get(['validRes']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      factureId: this.editForm.get(['factureId']).value,
      clientId: this.editForm.get(['clientId']).value,
      commercialId: this.editForm.get(['commercialId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommandeMySuffix>>) {
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

  trackFactureById(index: number, item: IFactureMySuffix) {
    return item.id;
  }

  trackClientById(index: number, item: IClientMySuffix) {
    return item.id;
  }

  trackEmployeById(index: number, item: IEmployeMySuffix) {
    return item.id;
  }
}
