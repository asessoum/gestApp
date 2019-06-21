/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { UtiProfileMySuffixDetailComponent } from 'app/entities/uti-profile-my-suffix/uti-profile-my-suffix-detail.component';
import { UtiProfileMySuffix } from 'app/shared/model/uti-profile-my-suffix.model';

describe('Component Tests', () => {
  describe('UtiProfileMySuffix Management Detail Component', () => {
    let comp: UtiProfileMySuffixDetailComponent;
    let fixture: ComponentFixture<UtiProfileMySuffixDetailComponent>;
    const route = ({ data: of({ utiProfile: new UtiProfileMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [UtiProfileMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UtiProfileMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UtiProfileMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.utiProfile).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
