/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { FournisseurMySuffixUpdateComponent } from 'app/entities/fournisseur-my-suffix/fournisseur-my-suffix-update.component';
import { FournisseurMySuffixService } from 'app/entities/fournisseur-my-suffix/fournisseur-my-suffix.service';
import { FournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';

describe('Component Tests', () => {
  describe('FournisseurMySuffix Management Update Component', () => {
    let comp: FournisseurMySuffixUpdateComponent;
    let fixture: ComponentFixture<FournisseurMySuffixUpdateComponent>;
    let service: FournisseurMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [FournisseurMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FournisseurMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FournisseurMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FournisseurMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FournisseurMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new FournisseurMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
