/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestAppTestModule } from '../../../test.module';
import { ArticleComposeMySuffixDeleteDialogComponent } from 'app/entities/article-compose-my-suffix/article-compose-my-suffix-delete-dialog.component';
import { ArticleComposeMySuffixService } from 'app/entities/article-compose-my-suffix/article-compose-my-suffix.service';

describe('Component Tests', () => {
  describe('ArticleComposeMySuffix Management Delete Component', () => {
    let comp: ArticleComposeMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<ArticleComposeMySuffixDeleteDialogComponent>;
    let service: ArticleComposeMySuffixService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [ArticleComposeMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(ArticleComposeMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArticleComposeMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleComposeMySuffixService);
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
