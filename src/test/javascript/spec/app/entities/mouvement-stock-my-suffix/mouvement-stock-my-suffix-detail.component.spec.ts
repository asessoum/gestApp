/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { MouvementStockMySuffixDetailComponent } from 'app/entities/mouvement-stock-my-suffix/mouvement-stock-my-suffix-detail.component';
import { MouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';

describe('Component Tests', () => {
  describe('MouvementStockMySuffix Management Detail Component', () => {
    let comp: MouvementStockMySuffixDetailComponent;
    let fixture: ComponentFixture<MouvementStockMySuffixDetailComponent>;
    const route = ({ data: of({ mouvementStock: new MouvementStockMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [MouvementStockMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MouvementStockMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MouvementStockMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mouvementStock).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
