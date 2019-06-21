/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { ProfileMySuffixDeleteDialogComponent } from 'app/entities/profile-my-suffix/profile-my-suffix-delete-dialog.component';
import { ProfileMySuffixService } from 'app/entities/profile-my-suffix/profile-my-suffix.service';

describe('Component Tests', () => {
  describe('ProfileMySuffix Management Delete Component', () => {
    let comp: ProfileMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<ProfileMySuffixDeleteDialogComponent>;
    let service: ProfileMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ProfileMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(ProfileMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfileMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfileMySuffixService);
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
