import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IFactureMySuffix, FactureMySuffix } from 'app/shared/model/facture-my-suffix.model';
import { FactureMySuffixService } from './facture-my-suffix.service';
import { ICommandeMySuffix } from 'app/shared/model/commande-my-suffix.model';
import { CommandeMySuffixService } from 'app/entities/commande-my-suffix';

@Component({
  selector: 'jhi-facture-my-suffix-update',
  templateUrl: './facture-my-suffix-update.component.html'
})
export class FactureMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  commandes: ICommandeMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    estReglee: [null, [Validators.required]],
    recu: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected factureService: FactureMySuffixService,
    protected commandeService: CommandeMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ facture }) => {
      this.updateForm(facture);
    });
    this.commandeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICommandeMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICommandeMySuffix[]>) => response.body)
      )
      .subscribe((res: ICommandeMySuffix[]) => (this.commandes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(facture: IFactureMySuffix) {
    this.editForm.patchValue({
      id: facture.id,
      techID: facture.techID,
      remoteID: facture.remoteID,
      estReglee: facture.estReglee,
      recu: facture.recu,
      creeLe: facture.creeLe != null ? facture.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: facture.creePar,
      modifLe: facture.modifLe != null ? facture.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: facture.modifPar
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const facture = this.createFromForm();
    if (facture.id !== undefined) {
      this.subscribeToSaveResponse(this.factureService.update(facture));
    } else {
      this.subscribeToSaveResponse(this.factureService.create(facture));
    }
  }

  private createFromForm(): IFactureMySuffix {
    return {
      ...new FactureMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      estReglee: this.editForm.get(['estReglee']).value,
      recu: this.editForm.get(['recu']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFactureMySuffix>>) {
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

  trackCommandeById(index: number, item: ICommandeMySuffix) {
    return item.id;
  }
}
