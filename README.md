# ASP.NET Core WebAPI / Angular Demo with Ngrx store & Ngrx effects, Component based design & Lazy Loading runnable on every Platform (Cross Platform)

This repository offers you a demo application implemented with the AngularCLI and an endpoint using ASP.NET Core WebAPI.

The application comes with lazy loading, forms, custom validation, routing , ngrx store, ngrx effects, etc.

Server and Client are completely seperated that you can exchange the endpoint easily.

### Check the corresponding package.json for the npm commands to start the repository

## Prerequisites

Please install cordova

`npm install cordova -g`

* [Android SDK](https://developer.android.com/sdk/index.html)
* [Windows 10 SDK](https://dev.windows.com/en-us/downloads/windows-10-sdk)
* Download and install [ImageMagick](http://www.imagemagick.org/script/download.php) (base toolkit for image processing, used here for splash screen and icon generation)

## Angular Client with Webpack, Treeshaking and Ahead of Time (Aot) Compilation

This client is implemented with Angular and Webpack. You can start the application by running

`npm install`

and

`npm start`

the application starts and runs in your default browser.

You can build Cross Platform by typing

`npm run build-all`

for building Web, Desktop (Windows and Linux) and Apps for Android and Windows Phone in the .dist folder.

# Demo

You can see an Angular Demo with all the techniques combined here (running on Azure)

## Frontend

[http://foodapiui.azurewebsites.net/](http://foodapiui.azurewebsites.net/)

## Backend

[http://foodapi4demo.azurewebsites.net/](http://foodapi4demo.azurewebsites.net/)

![DemoGif](.github/foodApiAzure.gif)

## Screens

### Home

![ASP.NET Core Angular Demo](.github/screen1.jpg 'Screen1')

### Form

![ASP.NET Core Angular Demo](.github/screen2.jpg 'Screen2')
