/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { LangueMySuffixDetailComponent } from 'app/entities/langue-my-suffix/langue-my-suffix-detail.component';
import { LangueMySuffix } from 'app/shared/model/langue-my-suffix.model';

describe('Component Tests', () => {
  describe('LangueMySuffix Management Detail Component', () => {
    let comp: LangueMySuffixDetailComponent;
    let fixture: ComponentFixture<LangueMySuffixDetailComponent>;
    const route = ({ data: of({ langue: new LangueMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [LangueMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LangueMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LangueMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.langue).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
