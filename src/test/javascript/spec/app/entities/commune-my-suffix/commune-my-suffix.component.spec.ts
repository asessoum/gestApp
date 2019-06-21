/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { CommuneMySuffixComponent } from 'app/entities/commune-my-suffix/commune-my-suffix.component';
import { CommuneMySuffixService } from 'app/entities/commune-my-suffix/commune-my-suffix.service';
import { CommuneMySuffix } from 'app/shared/model/commune-my-suffix.model';

describe('Component Tests', () => {
  describe('CommuneMySuffix Management Component', () => {
    let comp: CommuneMySuffixComponent;
    let fixture: ComponentFixture<CommuneMySuffixComponent>;
    let service: CommuneMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CommuneMySuffixComponent],
        providers: []
      })
        .overrideTemplate(CommuneMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommuneMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommuneMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CommuneMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.communes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
