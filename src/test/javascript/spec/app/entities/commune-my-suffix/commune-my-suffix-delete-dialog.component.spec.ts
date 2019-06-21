/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { CommuneMySuffixDeleteDialogComponent } from 'app/entities/commune-my-suffix/commune-my-suffix-delete-dialog.component';
import { CommuneMySuffixService } from 'app/entities/commune-my-suffix/commune-my-suffix.service';

describe('Component Tests', () => {
  describe('CommuneMySuffix Management Delete Component', () => {
    let comp: CommuneMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<CommuneMySuffixDeleteDialogComponent>;
    let service: CommuneMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CommuneMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(CommuneMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommuneMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommuneMySuffixService);
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
