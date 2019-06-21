/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { ArticleComposeMySuffixDetailComponent } from 'app/entities/article-compose-my-suffix/article-compose-my-suffix-detail.component';
import { ArticleComposeMySuffix } from 'app/shared/model/article-compose-my-suffix.model';

describe('Component Tests', () => {
  describe('ArticleComposeMySuffix Management Detail Component', () => {
    let comp: ArticleComposeMySuffixDetailComponent;
    let fixture: ComponentFixture<ArticleComposeMySuffixDetailComponent>;
    const route = ({ data: of({ articleCompose: new ArticleComposeMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ArticleComposeMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ArticleComposeMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArticleComposeMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.articleCompose).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
