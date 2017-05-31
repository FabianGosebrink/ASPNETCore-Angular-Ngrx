import './polyfills';
import './vendor';
import { AppModuleNgFactory } from '../.aot/src/app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
// Entry point for AoT compilation.

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
