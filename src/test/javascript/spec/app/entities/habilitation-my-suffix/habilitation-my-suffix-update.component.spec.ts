/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { HabilitationMySuffixUpdateComponent } from 'app/entities/habilitation-my-suffix/habilitation-my-suffix-update.component';
import { HabilitationMySuffixService } from 'app/entities/habilitation-my-suffix/habilitation-my-suffix.service';
import { HabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';

describe('Component Tests', () => {
  describe('HabilitationMySuffix Management Update Component', () => {
    let comp: HabilitationMySuffixUpdateComponent;
    let fixture: ComponentFixture<HabilitationMySuffixUpdateComponent>;
    let service: HabilitationMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [HabilitationMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HabilitationMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HabilitationMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HabilitationMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HabilitationMySuffix(123);
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
        const entity = new HabilitationMySuffix();
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
