import { Observable } from 'rxjs/Observable';

import { AbstractCameraService } from './camera.service';

declare const window: any;

export class DesktopCameraService implements AbstractCameraService {
  private getMediaDevices(): any {
    const mediaDevices =
      (window.navigator.mozGetUserMedia || window.navigator.webkitGetUserMedia
        ? {
            getUserMedia: function(options: any) {
              return new Promise((resolve, reject) => {
                (
                  window.navigator.mozGetUserMedia ||
                  window.navigator.webkitGetUserMedia
                ).call(window.navigator, options, resolve, reject);
              });
            }
          }
        : null) || window.navigator.mediaDevices;

    return mediaDevices;
  }

  getPhoto(): Observable<string> {
    return Observable.create((observer: any) => {
      this.getMediaDevices()
        .getUserMedia({ video: true, audio: false })
        .then(
          (stream: any) => {
            const vendorURL = window.URL || window.webkitURL;
            const doc = document;
            const videoElement = doc.createElement('video');
            videoElement.src = vendorURL.createObjectURL(stream);
            videoElement.play();

            const takePhotoInternal = () => {
              const canvasElement = doc.createElement('canvas');
              canvasElement.setAttribute(
                'width',
                videoElement.videoWidth.toString()
              );
              canvasElement.setAttribute(
                'height',
                videoElement.videoHeight.toString()
              );

              setTimeout(() => {
                const context = canvasElement.getContext('2d');
                context.drawImage(
                  videoElement,
                  0,
                  0,
                  videoElement.videoWidth,
                  videoElement.videoHeight
                );

                const url = canvasElement.toDataURL('image/png');

                videoElement.pause();

                if (stream.stop) {
                  stream.stop();
                }

                if (stream.getAudioTracks) {
                  stream.getAudioTracks().forEach((track: any) => {
                    track.stop();
                  });
                }

                if (stream.getVideoTracks) {
                  stream.getVideoTracks().forEach((track: any) => {
                    track.stop();
                  });
                }

                observer.next(url);
                observer.complete();
              }, 500);
            };

            if (videoElement.readyState >= videoElement.HAVE_FUTURE_DATA) {
              takePhotoInternal();
            } else {
              videoElement.addEventListener(
                'canplay',
                function() {
                  takePhotoInternal();
                },
                false
              );
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    });
  }
}
