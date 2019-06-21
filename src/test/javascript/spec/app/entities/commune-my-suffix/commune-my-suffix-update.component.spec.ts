/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { CommuneMySuffixUpdateComponent } from 'app/entities/commune-my-suffix/commune-my-suffix-update.component';
import { CommuneMySuffixService } from 'app/entities/commune-my-suffix/commune-my-suffix.service';
import { CommuneMySuffix } from 'app/shared/model/commune-my-suffix.model';

describe('Component Tests', () => {
  describe('CommuneMySuffix Management Update Component', () => {
    let comp: CommuneMySuffixUpdateComponent;
    let fixture: ComponentFixture<CommuneMySuffixUpdateComponent>;
    let service: CommuneMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CommuneMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CommuneMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommuneMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommuneMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CommuneMySuffix(123);
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
        const entity = new CommuneMySuffix();
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
