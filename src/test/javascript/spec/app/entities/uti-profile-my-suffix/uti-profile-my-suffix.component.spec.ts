/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { UtiProfileMySuffixComponent } from 'app/entities/uti-profile-my-suffix/uti-profile-my-suffix.component';
import { UtiProfileMySuffixService } from 'app/entities/uti-profile-my-suffix/uti-profile-my-suffix.service';
import { UtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';

describe('Component Tests', () => {
  describe('UtiProfileMySuffix Management Component', () => {
    let comp: UtiProfileMySuffixComponent;
    let fixture: ComponentFixture<UtiProfileMySuffixComponent>;
    let service: UtiProfileMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [UtiProfileMySuffixComponent],
        providers: []
      })
        .overrideTemplate(UtiProfileMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UtiProfileMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UtiProfileMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UtiProfileMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.utiProfiles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
