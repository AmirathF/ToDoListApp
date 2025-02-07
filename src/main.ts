import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Import FormsModule or ReactiveFormsModule
import { provideHttpClient } from '@angular/common/http'; // ✅ Import provideHttpClient


bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(), // ✅ Provide HttpClient directly
      importProvidersFrom(FormsModule), // ✅ Provide FormsModule for template-driven forms
      // OR
      // importProvidersFrom(ReactiveFormsModule), // ✅ Provide ReactiveFormsModule for reactive forms
    ],
  }).catch((err) => console.error(err));