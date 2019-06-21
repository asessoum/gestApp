/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { PaysMySuffixUpdateComponent } from 'app/entities/pays-my-suffix/pays-my-suffix-update.component';
import { PaysMySuffixService } from 'app/entities/pays-my-suffix/pays-my-suffix.service';
import { PaysMySuffix } from 'app/shared/model/pays-my-suffix.model';

describe('Component Tests', () => {
  describe('PaysMySuffix Management Update Component', () => {
    let comp: PaysMySuffixUpdateComponent;
    let fixture: ComponentFixture<PaysMySuffixUpdateComponent>;
    let service: PaysMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [PaysMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PaysMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaysMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaysMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaysMySuffix(123);
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
        const entity = new PaysMySuffix();
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
