/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { FactureMySuffixUpdateComponent } from 'app/entities/facture-my-suffix/facture-my-suffix-update.component';
import { FactureMySuffixService } from 'app/entities/facture-my-suffix/facture-my-suffix.service';
import { FactureMySuffix } from 'app/shared/model/facture-my-suffix.model';

describe('Component Tests', () => {
  describe('FactureMySuffix Management Update Component', () => {
    let comp: FactureMySuffixUpdateComponent;
    let fixture: ComponentFixture<FactureMySuffixUpdateComponent>;
    let service: FactureMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [FactureMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FactureMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FactureMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FactureMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FactureMySuffix(123);
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
        const entity = new FactureMySuffix();
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
