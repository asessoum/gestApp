/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { ReferenceMySuffixComponent } from 'app/entities/reference-my-suffix/reference-my-suffix.component';
import { ReferenceMySuffixService } from 'app/entities/reference-my-suffix/reference-my-suffix.service';
import { ReferenceMySuffix } from 'app/shared/model/reference-my-suffix.model';

describe('Component Tests', () => {
  describe('ReferenceMySuffix Management Component', () => {
    let comp: ReferenceMySuffixComponent;
    let fixture: ComponentFixture<ReferenceMySuffixComponent>;
    let service: ReferenceMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ReferenceMySuffixComponent],
        providers: []
      })
        .overrideTemplate(ReferenceMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReferenceMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReferenceMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ReferenceMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.references[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
