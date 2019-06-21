/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { ReductionMySuffixUpdateComponent } from 'app/entities/reduction-my-suffix/reduction-my-suffix-update.component';
import { ReductionMySuffixService } from 'app/entities/reduction-my-suffix/reduction-my-suffix.service';
import { ReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';

describe('Component Tests', () => {
  describe('ReductionMySuffix Management Update Component', () => {
    let comp: ReductionMySuffixUpdateComponent;
    let fixture: ComponentFixture<ReductionMySuffixUpdateComponent>;
    let service: ReductionMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ReductionMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReductionMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReductionMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReductionMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ReductionMySuffix(123);
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
        const entity = new ReductionMySuffix();
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
