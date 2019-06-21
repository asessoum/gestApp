/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { LangueMySuffixDeleteDialogComponent } from 'app/entities/langue-my-suffix/langue-my-suffix-delete-dialog.component';
import { LangueMySuffixService } from 'app/entities/langue-my-suffix/langue-my-suffix.service';

describe('Component Tests', () => {
  describe('LangueMySuffix Management Delete Component', () => {
    let comp: LangueMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<LangueMySuffixDeleteDialogComponent>;
    let service: LangueMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [LangueMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(LangueMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LangueMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LangueMySuffixService);
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
