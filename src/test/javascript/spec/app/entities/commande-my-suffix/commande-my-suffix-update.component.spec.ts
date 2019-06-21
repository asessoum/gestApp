/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { CommandeMySuffixUpdateComponent } from 'app/entities/commande-my-suffix/commande-my-suffix-update.component';
import { CommandeMySuffixService } from 'app/entities/commande-my-suffix/commande-my-suffix.service';
import { CommandeMySuffix } from 'app/shared/model/commande-my-suffix.model';

describe('Component Tests', () => {
  describe('CommandeMySuffix Management Update Component', () => {
    let comp: CommandeMySuffixUpdateComponent;
    let fixture: ComponentFixture<CommandeMySuffixUpdateComponent>;
    let service: CommandeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CommandeMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CommandeMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommandeMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommandeMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CommandeMySuffix(123);
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
        const entity = new CommandeMySuffix();
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
