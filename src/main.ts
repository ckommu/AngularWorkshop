import { bootstrapApplication } from '@angular/platform-browser'; 
import { appConfig } from './app/app.config'; 
import { AppComponent } from './app/app.component'; // "root" module

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
