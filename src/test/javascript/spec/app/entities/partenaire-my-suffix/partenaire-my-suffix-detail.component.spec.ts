/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { PartenaireMySuffixDetailComponent } from 'app/entities/partenaire-my-suffix/partenaire-my-suffix-detail.component';
import { PartenaireMySuffix } from 'app/shared/model/partenaire-my-suffix.model';

describe('Component Tests', () => {
  describe('PartenaireMySuffix Management Detail Component', () => {
    let comp: PartenaireMySuffixDetailComponent;
    let fixture: ComponentFixture<PartenaireMySuffixDetailComponent>;
    const route = ({ data: of({ partenaire: new PartenaireMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [PartenaireMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PartenaireMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartenaireMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.partenaire).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
