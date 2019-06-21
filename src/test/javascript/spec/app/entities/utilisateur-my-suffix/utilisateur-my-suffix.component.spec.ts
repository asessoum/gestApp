/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { UtilisateurMySuffixComponent } from 'app/entities/utilisateur-my-suffix/utilisateur-my-suffix.component';
import { UtilisateurMySuffixService } from 'app/entities/utilisateur-my-suffix/utilisateur-my-suffix.service';
import { UtilisateurMySuffix } from 'app/shared/model/utilisateur-my-suffix.model';

describe('Component Tests', () => {
  describe('UtilisateurMySuffix Management Component', () => {
    let comp: UtilisateurMySuffixComponent;
    let fixture: ComponentFixture<UtilisateurMySuffixComponent>;
    let service: UtilisateurMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [UtilisateurMySuffixComponent],
        providers: []
      })
        .overrideTemplate(UtilisateurMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UtilisateurMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UtilisateurMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UtilisateurMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.utilisateurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
