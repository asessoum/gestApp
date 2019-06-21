/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { ClientMySuffixDetailComponent } from 'app/entities/client-my-suffix/client-my-suffix-detail.component';
import { ClientMySuffix } from 'app/shared/model/client-my-suffix.model';

describe('Component Tests', () => {
  describe('ClientMySuffix Management Detail Component', () => {
    let comp: ClientMySuffixDetailComponent;
    let fixture: ComponentFixture<ClientMySuffixDetailComponent>;
    const route = ({ data: of({ client: new ClientMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ClientMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ClientMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClientMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.client).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
