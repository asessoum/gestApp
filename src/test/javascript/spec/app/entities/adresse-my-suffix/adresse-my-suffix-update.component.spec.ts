/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { AdresseMySuffixUpdateComponent } from 'app/entities/adresse-my-suffix/adresse-my-suffix-update.component';
import { AdresseMySuffixService } from 'app/entities/adresse-my-suffix/adresse-my-suffix.service';
import { AdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';

describe('Component Tests', () => {
  describe('AdresseMySuffix Management Update Component', () => {
    let comp: AdresseMySuffixUpdateComponent;
    let fixture: ComponentFixture<AdresseMySuffixUpdateComponent>;
    let service: AdresseMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [AdresseMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AdresseMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdresseMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdresseMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AdresseMySuffix(123);
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
        const entity = new AdresseMySuffix();
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
