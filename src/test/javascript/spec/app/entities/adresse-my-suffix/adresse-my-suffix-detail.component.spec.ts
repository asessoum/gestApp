/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { AdresseMySuffixDetailComponent } from 'app/entities/adresse-my-suffix/adresse-my-suffix-detail.component';
import { AdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';

describe('Component Tests', () => {
  describe('AdresseMySuffix Management Detail Component', () => {
    let comp: AdresseMySuffixDetailComponent;
    let fixture: ComponentFixture<AdresseMySuffixDetailComponent>;
    const route = ({ data: of({ adresse: new AdresseMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [AdresseMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AdresseMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdresseMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.adresse).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
