/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { PaysMySuffixDetailComponent } from 'app/entities/pays-my-suffix/pays-my-suffix-detail.component';
import { PaysMySuffix } from 'app/shared/model/pays-my-suffix.model';

describe('Component Tests', () => {
  describe('PaysMySuffix Management Detail Component', () => {
    let comp: PaysMySuffixDetailComponent;
    let fixture: ComponentFixture<PaysMySuffixDetailComponent>;
    const route = ({ data: of({ pays: new PaysMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [PaysMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PaysMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaysMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pays).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
