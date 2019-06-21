/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { PaysMySuffixDeleteDialogComponent } from 'app/entities/pays-my-suffix/pays-my-suffix-delete-dialog.component';
import { PaysMySuffixService } from 'app/entities/pays-my-suffix/pays-my-suffix.service';

describe('Component Tests', () => {
  describe('PaysMySuffix Management Delete Component', () => {
    let comp: PaysMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<PaysMySuffixDeleteDialogComponent>;
    let service: PaysMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [PaysMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(PaysMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaysMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaysMySuffixService);
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
