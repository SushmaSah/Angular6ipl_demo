import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateformComponent } from './createform/createform.component';
import { CreatepageComponent } from './createpage/createpage.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TeamplayerComponent } from './teamplayer/teamplayer.component';
import { FilterPipe } from './filter.pipe';
import { TeamCreatedComponent } from './team-created/team-created.component';

const Routes = [
  {path: '', component: HomeComponent},
  {path: 'createpage/:tn', component: CreatepageComponent},
  {path: 'teamplayer/:tm', component: TeamplayerComponent},
  {path: 'teamcreated', component: TeamCreatedComponent},
  {path: 'createform/:op', component: CreateformComponent,
    children:[
    {path: 'createpage', component: CreatepageComponent},
    {path: 'createpage/:tn', component: CreatepageComponent}
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    CreateformComponent,
    CreatepageComponent,
    HeaderComponent,
    HomeComponent,
    TeamplayerComponent,
    FilterPipe,
    TeamCreatedComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(Routes), FormsModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
