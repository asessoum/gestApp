/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { VenteMySuffixDetailComponent } from 'app/entities/vente-my-suffix/vente-my-suffix-detail.component';
import { VenteMySuffix } from 'app/shared/model/vente-my-suffix.model';

describe('Component Tests', () => {
  describe('VenteMySuffix Management Detail Component', () => {
    let comp: VenteMySuffixDetailComponent;
    let fixture: ComponentFixture<VenteMySuffixDetailComponent>;
    const route = ({ data: of({ vente: new VenteMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [VenteMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VenteMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VenteMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
