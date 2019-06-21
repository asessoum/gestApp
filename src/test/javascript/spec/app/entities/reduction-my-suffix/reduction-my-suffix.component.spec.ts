/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { ReductionMySuffixComponent } from 'app/entities/reduction-my-suffix/reduction-my-suffix.component';
import { ReductionMySuffixService } from 'app/entities/reduction-my-suffix/reduction-my-suffix.service';
import { ReductionMySuffix } from 'app/shared/model/reduction-my-suffix.model';

describe('Component Tests', () => {
  describe('ReductionMySuffix Management Component', () => {
    let comp: ReductionMySuffixComponent;
    let fixture: ComponentFixture<ReductionMySuffixComponent>;
    let service: ReductionMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ReductionMySuffixComponent],
        providers: []
      })
        .overrideTemplate(ReductionMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReductionMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReductionMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ReductionMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reductions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
