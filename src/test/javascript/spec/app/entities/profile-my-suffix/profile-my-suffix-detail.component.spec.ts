/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { ProfileMySuffixDetailComponent } from 'app/entities/profile-my-suffix/profile-my-suffix-detail.component';
import { ProfileMySuffix } from 'app/shared/model/profile-my-suffix.model';

describe('Component Tests', () => {
  describe('ProfileMySuffix Management Detail Component', () => {
    let comp: ProfileMySuffixDetailComponent;
    let fixture: ComponentFixture<ProfileMySuffixDetailComponent>;
    const route = ({ data: of({ profile: new ProfileMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ProfileMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProfileMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfileMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profile).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
