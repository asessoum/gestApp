/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestAppTestModule } from '../../../test.module';
import { CommandeMySuffixDetailComponent } from 'app/entities/commande-my-suffix/commande-my-suffix-detail.component';
import { CommandeMySuffix } from 'app/shared/model/commande-my-suffix.model';

describe('Component Tests', () => {
  describe('CommandeMySuffix Management Detail Component', () => {
    let comp: CommandeMySuffixDetailComponent;
    let fixture: ComponentFixture<CommandeMySuffixDetailComponent>;
    const route = ({ data: of({ commande: new CommandeMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CommandeMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CommandeMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommandeMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.commande).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
