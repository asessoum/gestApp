/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { ArticleMySuffixUpdateComponent } from 'app/entities/article-my-suffix/article-my-suffix-update.component';
import { ArticleMySuffixService } from 'app/entities/article-my-suffix/article-my-suffix.service';
import { ArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

describe('Component Tests', () => {
  describe('ArticleMySuffix Management Update Component', () => {
    let comp: ArticleMySuffixUpdateComponent;
    let fixture: ComponentFixture<ArticleMySuffixUpdateComponent>;
    let service: ArticleMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ArticleMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ArticleMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ArticleMySuffix(123);
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
        const entity = new ArticleMySuffix();
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
