/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { ArticleMySuffixDetailComponent } from 'app/entities/article-my-suffix/article-my-suffix-detail.component';
import { ArticleMySuffix } from 'app/shared/model/article-my-suffix.model';

describe('Component Tests', () => {
  describe('ArticleMySuffix Management Detail Component', () => {
    let comp: ArticleMySuffixDetailComponent;
    let fixture: ComponentFixture<ArticleMySuffixDetailComponent>;
    const route = ({ data: of({ article: new ArticleMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ArticleMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ArticleMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArticleMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.article).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
