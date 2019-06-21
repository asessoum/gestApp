/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { HabilitationMySuffixComponent } from 'app/entities/habilitation-my-suffix/habilitation-my-suffix.component';
import { HabilitationMySuffixService } from 'app/entities/habilitation-my-suffix/habilitation-my-suffix.service';
import { HabilitationMySuffix } from 'app/shared/model/habilitation-my-suffix.model';

describe('Component Tests', () => {
  describe('HabilitationMySuffix Management Component', () => {
    let comp: HabilitationMySuffixComponent;
    let fixture: ComponentFixture<HabilitationMySuffixComponent>;
    let service: HabilitationMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [HabilitationMySuffixComponent],
        providers: []
      })
        .overrideTemplate(HabilitationMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HabilitationMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HabilitationMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HabilitationMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.habilitations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
