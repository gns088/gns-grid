import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GnsGridModule } from '../../projects/gns-grid/src/lib/gns-grid.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GnsGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
