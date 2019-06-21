/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { CategorieMySuffixUpdateComponent } from 'app/entities/categorie-my-suffix/categorie-my-suffix-update.component';
import { CategorieMySuffixService } from 'app/entities/categorie-my-suffix/categorie-my-suffix.service';
import { CategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';

describe('Component Tests', () => {
  describe('CategorieMySuffix Management Update Component', () => {
    let comp: CategorieMySuffixUpdateComponent;
    let fixture: ComponentFixture<CategorieMySuffixUpdateComponent>;
    let service: CategorieMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CategorieMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CategorieMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategorieMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategorieMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CategorieMySuffix(123);
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
        const entity = new CategorieMySuffix();
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
