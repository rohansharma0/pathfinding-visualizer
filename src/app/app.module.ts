import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathfindingComponent } from './page/pathfinding/pathfinding.component';
import { NodeComponent } from './component/node/node.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    PathfindingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
