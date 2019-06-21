import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GestAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [GestAppSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [GestAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestAppSharedModule {
  static forRoot() {
    return {
      ngModule: GestAppSharedModule
    };
  }
}
