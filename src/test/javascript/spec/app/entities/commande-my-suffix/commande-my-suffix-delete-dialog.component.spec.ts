/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { CommandeMySuffixDeleteDialogComponent } from 'app/entities/commande-my-suffix/commande-my-suffix-delete-dialog.component';
import { CommandeMySuffixService } from 'app/entities/commande-my-suffix/commande-my-suffix.service';

describe('Component Tests', () => {
  describe('CommandeMySuffix Management Delete Component', () => {
    let comp: CommandeMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<CommandeMySuffixDeleteDialogComponent>;
    let service: CommandeMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CommandeMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(CommandeMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommandeMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommandeMySuffixService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
