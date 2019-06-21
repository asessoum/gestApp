/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { ArticleComposeMySuffixComponent } from 'app/entities/article-compose-my-suffix/article-compose-my-suffix.component';
import { ArticleComposeMySuffixService } from 'app/entities/article-compose-my-suffix/article-compose-my-suffix.service';
import { ArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';

describe('Component Tests', () => {
  describe('ArticleComposeMySuffix Management Component', () => {
    let comp: ArticleComposeMySuffixComponent;
    let fixture: ComponentFixture<ArticleComposeMySuffixComponent>;
    let service: ArticleComposeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ArticleComposeMySuffixComponent],
        providers: []
      })
        .overrideTemplate(ArticleComposeMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleComposeMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleComposeMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ArticleComposeMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.articleComposes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
