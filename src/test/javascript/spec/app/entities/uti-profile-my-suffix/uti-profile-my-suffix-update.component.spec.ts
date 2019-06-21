/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { UtiProfileMySuffixUpdateComponent } from 'app/entities/uti-profile-my-suffix/uti-profile-my-suffix-update.component';
import { UtiProfileMySuffixService } from 'app/entities/uti-profile-my-suffix/uti-profile-my-suffix.service';
import { UtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';

describe('Component Tests', () => {
  describe('UtiProfileMySuffix Management Update Component', () => {
    let comp: UtiProfileMySuffixUpdateComponent;
    let fixture: ComponentFixture<UtiProfileMySuffixUpdateComponent>;
    let service: UtiProfileMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [UtiProfileMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UtiProfileMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UtiProfileMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UtiProfileMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UtiProfileMySuffix(123);
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
        const entity = new UtiProfileMySuffix();
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
