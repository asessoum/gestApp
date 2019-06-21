/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { VenteMySuffixDeleteDialogComponent } from 'app/entities/vente-my-suffix/vente-my-suffix-delete-dialog.component';
import { VenteMySuffixService } from 'app/entities/vente-my-suffix/vente-my-suffix.service';

describe('Component Tests', () => {
  describe('VenteMySuffix Management Delete Component', () => {
    let comp: VenteMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<VenteMySuffixDeleteDialogComponent>;
    let service: VenteMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [VenteMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(VenteMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VenteMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VenteMySuffixService);
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
