/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { FournisseurMySuffixComponent } from 'app/entities/fournisseur-my-suffix/fournisseur-my-suffix.component';
import { FournisseurMySuffixService } from 'app/entities/fournisseur-my-suffix/fournisseur-my-suffix.service';
import { FournisseurMySuffix } from 'app/shared/model/fournisseur-my-suffix.model';

describe('Component Tests', () => {
  describe('FournisseurMySuffix Management Component', () => {
    let comp: FournisseurMySuffixComponent;
    let fixture: ComponentFixture<FournisseurMySuffixComponent>;
    let service: FournisseurMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [FournisseurMySuffixComponent],
        providers: []
      })
        .overrideTemplate(FournisseurMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FournisseurMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FournisseurMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FournisseurMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fournisseurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
