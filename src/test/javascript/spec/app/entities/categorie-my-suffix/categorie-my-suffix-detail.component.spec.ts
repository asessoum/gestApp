/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { CategorieMySuffixDetailComponent } from 'app/entities/categorie-my-suffix/categorie-my-suffix-detail.component';
import { CategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';

describe('Component Tests', () => {
  describe('CategorieMySuffix Management Detail Component', () => {
    let comp: CategorieMySuffixDetailComponent;
    let fixture: ComponentFixture<CategorieMySuffixDetailComponent>;
    const route = ({ data: of({ categorie: new CategorieMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CategorieMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CategorieMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategorieMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.categorie).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
