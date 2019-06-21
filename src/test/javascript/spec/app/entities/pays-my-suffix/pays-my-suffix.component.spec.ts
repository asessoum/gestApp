/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { PaysMySuffixComponent } from 'app/entities/pays-my-suffix/pays-my-suffix.component';
import { PaysMySuffixService } from 'app/entities/pays-my-suffix/pays-my-suffix.service';
import { PaysMySuffix } from 'app/shared/model/pays-my-suffix.model';

describe('Component Tests', () => {
  describe('PaysMySuffix Management Component', () => {
    let comp: PaysMySuffixComponent;
    let fixture: ComponentFixture<PaysMySuffixComponent>;
    let service: PaysMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [PaysMySuffixComponent],
        providers: []
      })
        .overrideTemplate(PaysMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaysMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaysMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PaysMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pays[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
