/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { ArticleComposeMySuffixUpdateComponent } from 'app/entities/article-compose-my-suffix/article-compose-my-suffix-update.component';
import { ArticleComposeMySuffixService } from 'app/entities/article-compose-my-suffix/article-compose-my-suffix.service';
import { ArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';

describe('Component Tests', () => {
  describe('ArticleComposeMySuffix Management Update Component', () => {
    let comp: ArticleComposeMySuffixUpdateComponent;
    let fixture: ComponentFixture<ArticleComposeMySuffixUpdateComponent>;
    let service: ArticleComposeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ArticleComposeMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ArticleComposeMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleComposeMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleComposeMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ArticleComposeMySuffix(123);
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
        const entity = new ArticleComposeMySuffix();
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
