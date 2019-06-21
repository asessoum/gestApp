/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { FournisseurMySuffixDetailComponent } from 'app/entities/fournisseur-my-suffix/fournisseur-my-suffix-detail.component';
import { FournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';

describe('Component Tests', () => {
  describe('FournisseurMySuffix Management Detail Component', () => {
    let comp: FournisseurMySuffixDetailComponent;
    let fixture: ComponentFixture<FournisseurMySuffixDetailComponent>;
    const route = ({ data: of({ fournisseur: new FournisseurMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [FournisseurMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FournisseurMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FournisseurMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fournisseur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
