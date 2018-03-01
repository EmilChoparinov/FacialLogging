// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WebCamModule, WebCamComponent } from 'ack-angular-webcam';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './components/log-reg/login/login.component';
import { LogRegComponent } from './components/log-reg/log-reg.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddNoteComponent } from './components/dashboard/add-note/add-note.component';
import { SubjectNavComponent } from './components/dashboard/subject-nav/subject-nav.component';
import { ShowNotesComponent } from './components/dashboard/show-notes/show-notes.component';
import { PopupDialogComponent } from './components/dashboard/subject-nav/popup-dialog/popup-dialog.component';

// PROVIDERS
import { UserService } from './services/user/user.service';
import { HttpModule } from '@angular/http';
import { NoteSubjectService } from './services/dashboard/note-subject.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogRegComponent,
    DashboardComponent,
    AddNoteComponent,
    SubjectNavComponent,
    ShowNotesComponent,
    PopupDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    WebCamModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule
  ],
  entryComponents: [PopupDialogComponent],
  providers: [UserService, NoteSubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
