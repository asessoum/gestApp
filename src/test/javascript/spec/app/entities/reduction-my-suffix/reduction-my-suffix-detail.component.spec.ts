/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { ReductionMySuffixDetailComponent } from 'app/entities/reduction-my-suffix/reduction-my-suffix-detail.component';
import { ReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';

describe('Component Tests', () => {
  describe('ReductionMySuffix Management Detail Component', () => {
    let comp: ReductionMySuffixDetailComponent;
    let fixture: ComponentFixture<ReductionMySuffixDetailComponent>;
    const route = ({ data: of({ reduction: new ReductionMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ReductionMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReductionMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReductionMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reduction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
