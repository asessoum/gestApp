/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { AdresseMySuffixDeleteDialogComponent } from 'app/entities/adresse-my-suffix/adresse-my-suffix-delete-dialog.component';
import { AdresseMySuffixService } from 'app/entities/adresse-my-suffix/adresse-my-suffix.service';

describe('Component Tests', () => {
  describe('AdresseMySuffix Management Delete Component', () => {
    let comp: AdresseMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<AdresseMySuffixDeleteDialogComponent>;
    let service: AdresseMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [AdresseMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(AdresseMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdresseMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdresseMySuffixService);
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
