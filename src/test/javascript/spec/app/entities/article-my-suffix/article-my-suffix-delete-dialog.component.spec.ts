/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { ArticleMySuffixDeleteDialogComponent } from 'app/entities/article-my-suffix/article-my-suffix-delete-dialog.component';
import { ArticleMySuffixService } from 'app/entities/article-my-suffix/article-my-suffix.service';

describe('Component Tests', () => {
  describe('ArticleMySuffix Management Delete Component', () => {
    let comp: ArticleMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<ArticleMySuffixDeleteDialogComponent>;
    let service: ArticleMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ArticleMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(ArticleMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArticleMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleMySuffixService);
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
