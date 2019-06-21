/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { VenteMySuffixUpdateComponent } from 'app/entities/vente-my-suffix/vente-my-suffix-update.component';
import { VenteMySuffixService } from 'app/entities/vente-my-suffix/vente-my-suffix.service';
import { VenteMySuffix } from 'app/shared/model/vente-my-suffix.model';

describe('Component Tests', () => {
  describe('VenteMySuffix Management Update Component', () => {
    let comp: VenteMySuffixUpdateComponent;
    let fixture: ComponentFixture<VenteMySuffixUpdateComponent>;
    let service: VenteMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [VenteMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VenteMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VenteMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VenteMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new VenteMySuffix(123);
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
        const entity = new VenteMySuffix();
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
