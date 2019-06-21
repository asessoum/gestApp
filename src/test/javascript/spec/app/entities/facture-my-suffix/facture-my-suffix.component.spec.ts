/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { FactureMySuffixComponent } from 'app/entities/facture-my-suffix/facture-my-suffix.component';
import { FactureMySuffixService } from 'app/entities/facture-my-suffix/facture-my-suffix.service';
import { FactureMySuffix } from 'app/shared/model/facture-my-suffix.model';

describe('Component Tests', () => {
  describe('FactureMySuffix Management Component', () => {
    let comp: FactureMySuffixComponent;
    let fixture: ComponentFixture<FactureMySuffixComponent>;
    let service: FactureMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [FactureMySuffixComponent],
        providers: []
      })
        .overrideTemplate(FactureMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FactureMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FactureMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FactureMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.factures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
