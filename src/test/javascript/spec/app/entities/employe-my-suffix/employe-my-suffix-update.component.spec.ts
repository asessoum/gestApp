/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { EmployeMySuffixUpdateComponent } from 'app/entities/employe-my-suffix/employe-my-suffix-update.component';
import { EmployeMySuffixService } from 'app/entities/employe-my-suffix/employe-my-suffix.service';
import { EmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';

describe('Component Tests', () => {
  describe('EmployeMySuffix Management Update Component', () => {
    let comp: EmployeMySuffixUpdateComponent;
    let fixture: ComponentFixture<EmployeMySuffixUpdateComponent>;
    let service: EmployeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [EmployeMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EmployeMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeMySuffix(123);
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
        const entity = new EmployeMySuffix();
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
