/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { CategorieMySuffixDeleteDialogComponent } from 'app/entities/categorie-my-suffix/categorie-my-suffix-delete-dialog.component';
import { CategorieMySuffixService } from 'app/entities/categorie-my-suffix/categorie-my-suffix.service';

describe('Component Tests', () => {
  describe('CategorieMySuffix Management Delete Component', () => {
    let comp: CategorieMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<CategorieMySuffixDeleteDialogComponent>;
    let service: CategorieMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CategorieMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(CategorieMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategorieMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategorieMySuffixService);
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
