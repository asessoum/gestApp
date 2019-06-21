/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { AdresseMySuffixComponent } from 'app/entities/adresse-my-suffix/adresse-my-suffix.component';
import { AdresseMySuffixService } from 'app/entities/adresse-my-suffix/adresse-my-suffix.service';
import { AdresseMySuffix } from 'app/shared/model/adresse-my-suffix.model';

describe('Component Tests', () => {
  describe('AdresseMySuffix Management Component', () => {
    let comp: AdresseMySuffixComponent;
    let fixture: ComponentFixture<AdresseMySuffixComponent>;
    let service: AdresseMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [AdresseMySuffixComponent],
        providers: []
      })
        .overrideTemplate(AdresseMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdresseMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdresseMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AdresseMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.adresses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
