/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { EmployeMySuffixDeleteDialogComponent } from 'app/entities/employe-my-suffix/employe-my-suffix-delete-dialog.component';
import { EmployeMySuffixService } from 'app/entities/employe-my-suffix/employe-my-suffix.service';

describe('Component Tests', () => {
  describe('EmployeMySuffix Management Delete Component', () => {
    let comp: EmployeMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<EmployeMySuffixDeleteDialogComponent>;
    let service: EmployeMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [EmployeMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(EmployeMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeMySuffixService);
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
