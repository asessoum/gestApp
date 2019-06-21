/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { MouvementStockMySuffixComponent } from 'app/entities/mouvement-stock-my-suffix/mouvement-stock-my-suffix.component';
import { MouvementStockMySuffixService } from 'app/entities/mouvement-stock-my-suffix/mouvement-stock-my-suffix.service';
import { MouvementStockMySuffix } from 'app/shared/model/mouvement-stock-my-suffix.model';

describe('Component Tests', () => {
  describe('MouvementStockMySuffix Management Component', () => {
    let comp: MouvementStockMySuffixComponent;
    let fixture: ComponentFixture<MouvementStockMySuffixComponent>;
    let service: MouvementStockMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [MouvementStockMySuffixComponent],
        providers: []
      })
        .overrideTemplate(MouvementStockMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MouvementStockMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MouvementStockMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MouvementStockMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mouvementStocks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
