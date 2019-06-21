/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { HabilitationMySuffixDeleteDialogComponent } from 'app/entities/habilitation-my-suffix/habilitation-my-suffix-delete-dialog.component';
import { HabilitationMySuffixService } from 'app/entities/habilitation-my-suffix/habilitation-my-suffix.service';

describe('Component Tests', () => {
  describe('HabilitationMySuffix Management Delete Component', () => {
    let comp: HabilitationMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<HabilitationMySuffixDeleteDialogComponent>;
    let service: HabilitationMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [HabilitationMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(HabilitationMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HabilitationMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HabilitationMySuffixService);
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
