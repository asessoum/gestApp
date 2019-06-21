/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { FournisseurMySuffixDeleteDialogComponent } from 'app/entities/fournisseur-my-suffix/fournisseur-my-suffix-delete-dialog.component';
import { FournisseurMySuffixService } from 'app/entities/fournisseur-my-suffix/fournisseur-my-suffix.service';

describe('Component Tests', () => {
  describe('FournisseurMySuffix Management Delete Component', () => {
    let comp: FournisseurMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<FournisseurMySuffixDeleteDialogComponent>;
    let service: FournisseurMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [FournisseurMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(FournisseurMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FournisseurMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FournisseurMySuffixService);
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
