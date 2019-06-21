/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { LangueMySuffixComponent } from 'app/entities/langue-my-suffix/langue-my-suffix.component';
import { LangueMySuffixService } from 'app/entities/langue-my-suffix/langue-my-suffix.service';
import { LangueMySuffix } from 'app/shared/model/langue-my-suffix.model';

describe('Component Tests', () => {
  describe('LangueMySuffix Management Component', () => {
    let comp: LangueMySuffixComponent;
    let fixture: ComponentFixture<LangueMySuffixComponent>;
    let service: LangueMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [LangueMySuffixComponent],
        providers: []
      })
        .overrideTemplate(LangueMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LangueMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LangueMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LangueMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.langues[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
