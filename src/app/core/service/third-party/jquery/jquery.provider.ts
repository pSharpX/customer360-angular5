import { InjectionToken, ValueProvider } from '@angular/core';

// const jQuery: InjectionToken<JQueryStatic> = new InjectionToken<JQueryStatic>('jQuery');
const jQuery: InjectionToken<JQuery> = new InjectionToken<JQuery>('jQuery');
const jQueryProvider: ValueProvider = { provide: jQuery, useValue: window['jQuery'] };

export { jQuery, jQueryProvider };
