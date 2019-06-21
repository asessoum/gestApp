/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { LangueMySuffixUpdateComponent } from 'app/entities/langue-my-suffix/langue-my-suffix-update.component';
import { LangueMySuffixService } from 'app/entities/langue-my-suffix/langue-my-suffix.service';
import { LangueMySuffix } from 'app/shared/model/langue-my-suffix.model';

describe('Component Tests', () => {
  describe('LangueMySuffix Management Update Component', () => {
    let comp: LangueMySuffixUpdateComponent;
    let fixture: ComponentFixture<LangueMySuffixUpdateComponent>;
    let service: LangueMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [LangueMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LangueMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LangueMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LangueMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LangueMySuffix(123);
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
        const entity = new LangueMySuffix();
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
