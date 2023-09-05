import { NgModule, ModuleWithProviders } from '@angular/core';

// import { MyDirective } from './my.directive';
import { KeysPipe } from '../pipes/keyvalue.pipe';
// import { SomeService } from './some.service';

@NgModule({
    declarations: [
        KeysPipe
    ],
    exports: [
        KeysPipe
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}