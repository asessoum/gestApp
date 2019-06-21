/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { UtilisateurMySuffixDetailComponent } from 'app/entities/utilisateur-my-suffix/utilisateur-my-suffix-detail.component';
import { UtilisateurMySuffix } from 'app/shared/model/utilisateur-my-suffix.model';

describe('Component Tests', () => {
  describe('UtilisateurMySuffix Management Detail Component', () => {
    let comp: UtilisateurMySuffixDetailComponent;
    let fixture: ComponentFixture<UtilisateurMySuffixDetailComponent>;
    const route = ({ data: of({ utilisateur: new UtilisateurMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [UtilisateurMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UtilisateurMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UtilisateurMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.utilisateur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
