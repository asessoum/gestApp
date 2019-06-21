/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { EmployeMySuffixDetailComponent } from 'app/entities/employe-my-suffix/employe-my-suffix-detail.component';
import { EmployeMySuffix } from 'app/shared/model/employe-my-suffix.model';

describe('Component Tests', () => {
  describe('EmployeMySuffix Management Detail Component', () => {
    let comp: EmployeMySuffixDetailComponent;
    let fixture: ComponentFixture<EmployeMySuffixDetailComponent>;
    const route = ({ data: of({ employe: new EmployeMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [EmployeMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EmployeMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employe).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
