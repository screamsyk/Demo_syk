import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './appInit/app.component';
import { Heroes } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    Heroes
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, Heroes]
})
export class AppModule { }
