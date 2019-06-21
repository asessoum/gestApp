/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { HabilitationMySuffixDetailComponent } from 'app/entities/habilitation-my-suffix/habilitation-my-suffix-detail.component';
import { HabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';

describe('Component Tests', () => {
  describe('HabilitationMySuffix Management Detail Component', () => {
    let comp: HabilitationMySuffixDetailComponent;
    let fixture: ComponentFixture<HabilitationMySuffixDetailComponent>;
    const route = ({ data: of({ habilitation: new HabilitationMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [HabilitationMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HabilitationMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HabilitationMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.habilitation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
