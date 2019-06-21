/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { PartenaireMySuffixUpdateComponent } from 'app/entities/partenaire-my-suffix/partenaire-my-suffix-update.component';
import { PartenaireMySuffixService } from 'app/entities/partenaire-my-suffix/partenaire-my-suffix.service';
import { PartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';

describe('Component Tests', () => {
  describe('PartenaireMySuffix Management Update Component', () => {
    let comp: PartenaireMySuffixUpdateComponent;
    let fixture: ComponentFixture<PartenaireMySuffixUpdateComponent>;
    let service: PartenaireMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [PartenaireMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PartenaireMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PartenaireMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartenaireMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PartenaireMySuffix(123);
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
        const entity = new PartenaireMySuffix();
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
