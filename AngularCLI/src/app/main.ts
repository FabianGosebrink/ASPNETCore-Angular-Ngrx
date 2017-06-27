import './polyfills';
import './vendor';
import { AppModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



platformBrowserDynamic().bootstrapModule(AppModule);
