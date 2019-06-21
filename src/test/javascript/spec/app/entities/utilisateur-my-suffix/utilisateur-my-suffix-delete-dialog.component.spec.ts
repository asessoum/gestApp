/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { UtilisateurMySuffixDeleteDialogComponent } from 'app/entities/utilisateur-my-suffix/utilisateur-my-suffix-delete-dialog.component';
import { UtilisateurMySuffixService } from 'app/entities/utilisateur-my-suffix/utilisateur-my-suffix.service';

describe('Component Tests', () => {
  describe('UtilisateurMySuffix Management Delete Component', () => {
    let comp: UtilisateurMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<UtilisateurMySuffixDeleteDialogComponent>;
    let service: UtilisateurMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [UtilisateurMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(UtilisateurMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UtilisateurMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UtilisateurMySuffixService);
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
