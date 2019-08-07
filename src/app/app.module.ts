import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatService } from './services/chat.service';
import { FormsModule } from '@angular/forms';
import { ClientComponent } from './client/client.component';
import { HostComponent } from './host/host.component';
import { AppRouting } from './app-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    HostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    RouterModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
