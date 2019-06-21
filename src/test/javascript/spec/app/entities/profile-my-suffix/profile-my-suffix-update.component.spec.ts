/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { ProfileMySuffixUpdateComponent } from 'app/entities/profile-my-suffix/profile-my-suffix-update.component';
import { ProfileMySuffixService } from 'app/entities/profile-my-suffix/profile-my-suffix.service';
import { ProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';

describe('Component Tests', () => {
  describe('ProfileMySuffix Management Update Component', () => {
    let comp: ProfileMySuffixUpdateComponent;
    let fixture: ComponentFixture<ProfileMySuffixUpdateComponent>;
    let service: ProfileMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ProfileMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProfileMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfileMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfileMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfileMySuffix(123);
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
        const entity = new ProfileMySuffix();
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
