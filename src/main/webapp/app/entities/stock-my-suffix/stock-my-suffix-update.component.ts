import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IStockMySuffix, StockMySuffix } from 'app/shared/model/stock-my-suffix.model';
import { StockMySuffixService } from './stock-my-suffix.service';

@Component({
  selector: 'jhi-stock-my-suffix-update',
  templateUrl: './stock-my-suffix-update.component.html'
})
export class StockMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    quantite: [],
    quantiteMin: [],
    quantiteMax: [],
    dateModification: []
  });

  constructor(protected stockService: StockMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ stock }) => {
      this.updateForm(stock);
    });
  }

  updateForm(stock: IStockMySuffix) {
    this.editForm.patchValue({
      id: stock.id,
      techID: stock.techID,
      remoteID: stock.remoteID,
      quantite: stock.quantite,
      quantiteMin: stock.quantiteMin,
      quantiteMax: stock.quantiteMax,
      dateModification: stock.dateModification != null ? stock.dateModification.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const stock = this.createFromForm();
    if (stock.id !== undefined) {
      this.subscribeToSaveResponse(this.stockService.update(stock));
    } else {
      this.subscribeToSaveResponse(this.stockService.create(stock));
    }
  }

  private createFromForm(): IStockMySuffix {
    return {
      ...new StockMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      quantite: this.editForm.get(['quantite']).value,
      quantiteMin: this.editForm.get(['quantiteMin']).value,
      quantiteMax: this.editForm.get(['quantiteMax']).value,
      dateModification:
        this.editForm.get(['dateModification']).value != null
          ? moment(this.editForm.get(['dateModification']).value, DATE_TIME_FORMAT)
          : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStockMySuffix>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
