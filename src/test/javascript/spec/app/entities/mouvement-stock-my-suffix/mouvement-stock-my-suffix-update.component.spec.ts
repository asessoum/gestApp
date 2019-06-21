/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { MouvementStockMySuffixUpdateComponent } from 'app/entities/mouvement-stock-my-suffix/mouvement-stock-my-suffix-update.component';
import { MouvementStockMySuffixService } from 'app/entities/mouvement-stock-my-suffix/mouvement-stock-my-suffix.service';
import { MouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';

describe('Component Tests', () => {
  describe('MouvementStockMySuffix Management Update Component', () => {
    let comp: MouvementStockMySuffixUpdateComponent;
    let fixture: ComponentFixture<MouvementStockMySuffixUpdateComponent>;
    let service: MouvementStockMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [MouvementStockMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MouvementStockMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MouvementStockMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MouvementStockMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MouvementStockMySuffix(123);
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
        const entity = new MouvementStockMySuffix();
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
