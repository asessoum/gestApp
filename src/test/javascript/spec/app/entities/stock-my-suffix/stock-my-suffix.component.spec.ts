/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { StockMySuffixComponent } from 'app/entities/stock-my-suffix/stock-my-suffix.component';
import { StockMySuffixService } from 'app/entities/stock-my-suffix/stock-my-suffix.service';
import { StockMySuffix } from 'app/shared/model/stock-my-suffix.model';

describe('Component Tests', () => {
  describe('StockMySuffix Management Component', () => {
    let comp: StockMySuffixComponent;
    let fixture: ComponentFixture<StockMySuffixComponent>;
    let service: StockMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [StockMySuffixComponent],
        providers: []
      })
        .overrideTemplate(StockMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StockMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StockMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StockMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.stocks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
