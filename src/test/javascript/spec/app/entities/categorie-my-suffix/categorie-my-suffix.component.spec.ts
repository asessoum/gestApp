/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestAppTestModule } from '../../../test.module';
import { CategorieMySuffixComponent } from 'app/entities/categorie-my-suffix/categorie-my-suffix.component';
import { CategorieMySuffixService } from 'app/entities/categorie-my-suffix/categorie-my-suffix.service';
import { CategorieMySuffix } from 'app/shared/model/categorie-my-suffix.model';

describe('Component Tests', () => {
  describe('CategorieMySuffix Management Component', () => {
    let comp: CategorieMySuffixComponent;
    let fixture: ComponentFixture<CategorieMySuffixComponent>;
    let service: CategorieMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestAppTestModule],
        declarations: [CategorieMySuffixComponent],
        providers: []
      })
        .overrideTemplate(CategorieMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategorieMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategorieMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CategorieMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.categories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
