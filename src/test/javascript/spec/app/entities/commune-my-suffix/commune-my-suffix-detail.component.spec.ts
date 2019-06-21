/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { CommuneMySuffixDetailComponent } from 'app/entities/commune-my-suffix/commune-my-suffix-detail.component';
import { CommuneMySuffix } from 'app/shared/model/commune-my-suffix.model';

describe('Component Tests', () => {
  describe('CommuneMySuffix Management Detail Component', () => {
    let comp: CommuneMySuffixDetailComponent;
    let fixture: ComponentFixture<CommuneMySuffixDetailComponent>;
    const route = ({ data: of({ commune: new CommuneMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CommuneMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CommuneMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommuneMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.commune).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
