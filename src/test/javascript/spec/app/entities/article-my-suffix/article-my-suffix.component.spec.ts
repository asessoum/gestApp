/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { ArticleMySuffixComponent } from 'app/entities/article-my-suffix/article-my-suffix.component';
import { ArticleMySuffixService } from 'app/entities/article-my-suffix/article-my-suffix.service';
import { ArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

describe('Component Tests', () => {
  describe('ArticleMySuffix Management Component', () => {
    let comp: ArticleMySuffixComponent;
    let fixture: ComponentFixture<ArticleMySuffixComponent>;
    let service: ArticleMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ArticleMySuffixComponent],
        providers: []
      })
        .overrideTemplate(ArticleMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ArticleMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.articles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
