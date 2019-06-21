/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { ProfileMySuffixComponent } from 'app/entities/profile-my-suffix/profile-my-suffix.component';
import { ProfileMySuffixService } from 'app/entities/profile-my-suffix/profile-my-suffix.service';
import { ProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';

describe('Component Tests', () => {
  describe('ProfileMySuffix Management Component', () => {
    let comp: ProfileMySuffixComponent;
    let fixture: ComponentFixture<ProfileMySuffixComponent>;
    let service: ProfileMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ProfileMySuffixComponent],
        providers: []
      })
        .overrideTemplate(ProfileMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfileMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfileMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProfileMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profiles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
