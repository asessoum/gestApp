/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { FactureMySuffixDetailComponent } from 'app/entities/facture-my-suffix/facture-my-suffix-detail.component';
import { FactureMySuffix } from 'app/shared/model/facture-my-suffix.model';

describe('Component Tests', () => {
  describe('FactureMySuffix Management Detail Component', () => {
    let comp: FactureMySuffixDetailComponent;
    let fixture: ComponentFixture<FactureMySuffixDetailComponent>;
    const route = ({ data: of({ facture: new FactureMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [FactureMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FactureMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FactureMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.facture).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
