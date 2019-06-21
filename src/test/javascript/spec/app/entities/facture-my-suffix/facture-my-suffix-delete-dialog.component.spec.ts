/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { FactureMySuffixDeleteDialogComponent } from 'app/entities/facture-my-suffix/facture-my-suffix-delete-dialog.component';
import { FactureMySuffixService } from 'app/entities/facture-my-suffix/facture-my-suffix.service';

describe('Component Tests', () => {
  describe('FactureMySuffix Management Delete Component', () => {
    let comp: FactureMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<FactureMySuffixDeleteDialogComponent>;
    let service: FactureMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [FactureMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(FactureMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FactureMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FactureMySuffixService);
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