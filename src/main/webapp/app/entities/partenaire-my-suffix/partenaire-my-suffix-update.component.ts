import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPartenaireMySuffix, PartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';
import { PartenaireMySuffixService } from './partenaire-my-suffix.service';
import { ILangueMySuffix } from 'app/shared/model/langue-my-suffix.model';
import { LangueMySuffixService } from 'app/entities/langue-my-suffix';
import { IAdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';
import { AdresseMySuffixService } from 'app/entities/adresse-my-suffix';
import { IReferenceMySuffix } from 'app/shared/model/reference-my-suffix.model';
import { ReferenceMySuffixService } from 'app/entities/reference-my-suffix';
import { ICategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';
import { CategorieMySuffixService } from 'app/entities/categorie-my-suffix';
import { IArticleMySuffix } from 'app/shared/model/article-my-suffix.model';
import { ArticleMySuffixService } from 'app/entities/article-my-suffix';
import { IReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';
import { ReductionMySuffixService } from 'app/entities/reduction-my-suffix';
import { IProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';
import { ProfileMySuffixService } from 'app/entities/profile-my-suffix';
import { IHabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';
import { HabilitationMySuffixService } from 'app/entities/habilitation-my-suffix';
import { IFournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';
import { FournisseurMySuffixService } from 'app/entities/fournisseur-my-suffix';

@Component({
  selector: 'jhi-partenaire-my-suffix-update',
  templateUrl: './partenaire-my-suffix-update.component.html'
})
export class PartenaireMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  langues: ILangueMySuffix[];

  adresses: IAdresseMySuffix[];

  references: IReferenceMySuffix[];

  categories: ICategorieMySuffix[];

  articles: IArticleMySuffix[];

  reductions: IReductionMySuffix[];

  profiles: IProfileMySuffix[];

  habilitations: IHabilitationMySuffix[];

  fournisseurs: IFournisseurMySuffix[];

  editForm = this.fb.group({
    id: [],
    techID: [null, [Validators.required, Validators.maxLength(250)]],
    remoteID: [null, [Validators.required]],
    raisonSociale: [null, [Validators.maxLength(50)]],
    nombreSalaries: [],
    estActif: [],
    creeLe: [],
    creePar: [],
    modifLe: [],
    modifPar: [],
    langueId: [],
    adresseId: [],
    referencesId: [],
    categoriesId: [],
    articlesId: [],
    reductionsId: [],
    profilesId: [],
    habilitationsId: [],
    fournisseursId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partenaireService: PartenaireMySuffixService,
    protected langueService: LangueMySuffixService,
    protected adresseService: AdresseMySuffixService,
    protected referenceService: ReferenceMySuffixService,
    protected categorieService: CategorieMySuffixService,
    protected articleService: ArticleMySuffixService,
    protected reductionService: ReductionMySuffixService,
    protected profileService: ProfileMySuffixService,
    protected habilitationService: HabilitationMySuffixService,
    protected fournisseurService: FournisseurMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ partenaire }) => {
      this.updateForm(partenaire);
    });
    this.langueService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILangueMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILangueMySuffix[]>) => response.body)
      )
      .subscribe((res: ILangueMySuffix[]) => (this.langues = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.adresseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAdresseMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAdresseMySuffix[]>) => response.body)
      )
      .subscribe((res: IAdresseMySuffix[]) => (this.adresses = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.referenceService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IReferenceMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IReferenceMySuffix[]>) => response.body)
      )
      .subscribe((res: IReferenceMySuffix[]) => (this.references = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.categorieService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategorieMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategorieMySuffix[]>) => response.body)
      )
      .subscribe((res: ICategorieMySuffix[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.articleService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticleMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticleMySuffix[]>) => response.body)
      )
      .subscribe((res: IArticleMySuffix[]) => (this.articles = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.reductionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IReductionMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IReductionMySuffix[]>) => response.body)
      )
      .subscribe((res: IReductionMySuffix[]) => (this.reductions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.profileService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProfileMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProfileMySuffix[]>) => response.body)
      )
      .subscribe((res: IProfileMySuffix[]) => (this.profiles = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.habilitationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IHabilitationMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IHabilitationMySuffix[]>) => response.body)
      )
      .subscribe((res: IHabilitationMySuffix[]) => (this.habilitations = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.fournisseurService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFournisseurMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFournisseurMySuffix[]>) => response.body)
      )
      .subscribe((res: IFournisseurMySuffix[]) => (this.fournisseurs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(partenaire: IPartenaireMySuffix) {
    this.editForm.patchValue({
      id: partenaire.id,
      techID: partenaire.techID,
      remoteID: partenaire.remoteID,
      raisonSociale: partenaire.raisonSociale,
      nombreSalaries: partenaire.nombreSalaries,
      estActif: partenaire.estActif,
      creeLe: partenaire.creeLe != null ? partenaire.creeLe.format(DATE_TIME_FORMAT) : null,
      creePar: partenaire.creePar,
      modifLe: partenaire.modifLe != null ? partenaire.modifLe.format(DATE_TIME_FORMAT) : null,
      modifPar: partenaire.modifPar,
      langueId: partenaire.langueId,
      adresseId: partenaire.adresseId,
      referencesId: partenaire.referencesId,
      categoriesId: partenaire.categoriesId,
      articlesId: partenaire.articlesId,
      reductionsId: partenaire.reductionsId,
      profilesId: partenaire.profilesId,
      habilitationsId: partenaire.habilitationsId,
      fournisseursId: partenaire.fournisseursId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const partenaire = this.createFromForm();
    if (partenaire.id !== undefined) {
      this.subscribeToSaveResponse(this.partenaireService.update(partenaire));
    } else {
      this.subscribeToSaveResponse(this.partenaireService.create(partenaire));
    }
  }

  private createFromForm(): IPartenaireMySuffix {
    return {
      ...new PartenaireMySuffix(),
      id: this.editForm.get(['id']).value,
      techID: this.editForm.get(['techID']).value,
      remoteID: this.editForm.get(['remoteID']).value,
      raisonSociale: this.editForm.get(['raisonSociale']).value,
      nombreSalaries: this.editForm.get(['nombreSalaries']).value,
      estActif: this.editForm.get(['estActif']).value,
      creeLe: this.editForm.get(['creeLe']).value != null ? moment(this.editForm.get(['creeLe']).value, DATE_TIME_FORMAT) : undefined,
      creePar: this.editForm.get(['creePar']).value,
      modifLe: this.editForm.get(['modifLe']).value != null ? moment(this.editForm.get(['modifLe']).value, DATE_TIME_FORMAT) : undefined,
      modifPar: this.editForm.get(['modifPar']).value,
      langueId: this.editForm.get(['langueId']).value,
      adresseId: this.editForm.get(['adresseId']).value,
      referencesId: this.editForm.get(['referencesId']).value,
      categoriesId: this.editForm.get(['categoriesId']).value,
      articlesId: this.editForm.get(['articlesId']).value,
      reductionsId: this.editForm.get(['reductionsId']).value,
      profilesId: this.editForm.get(['profilesId']).value,
      habilitationsId: this.editForm.get(['habilitationsId']).value,
      fournisseursId: this.editForm.get(['fournisseursId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartenaireMySuffix>>) {
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

  trackAdresseById(index: number, item: IAdresseMySuffix) {
    return item.id;
  }

  trackReferenceById(index: number, item: IReferenceMySuffix) {
    return item.id;
  }

  trackCategorieById(index: number, item: ICategorieMySuffix) {
    return item.id;
  }

  trackArticleById(index: number, item: IArticleMySuffix) {
    return item.id;
  }

  trackReductionById(index: number, item: IReductionMySuffix) {
    return item.id;
  }

  trackProfileById(index: number, item: IProfileMySuffix) {
    return item.id;
  }

  trackHabilitationById(index: number, item: IHabilitationMySuffix) {
    return item.id;
  }

  trackFournisseurById(index: number, item: IFournisseurMySuffix) {
    return item.id;
  }
}
