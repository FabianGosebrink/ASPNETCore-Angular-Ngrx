import { Observable } from 'rxjs/Rx';
var DesktopCameraService = (function () {
    function DesktopCameraService() {
        console.log('DesktopCameraService');
    }
    DesktopCameraService.prototype.getMediaDevices = function () {
        var mediaDevices = ((window.navigator.mozGetUserMedia || window.navigator.webkitGetUserMedia) ? {
            getUserMedia: function (options) {
                return new Promise(function (resolve, reject) {
                    (window.navigator.mozGetUserMedia ||
                        window.navigator.webkitGetUserMedia).call(window.navigator, options, resolve, reject);
                });
            }
        } : null) || window.navigator.mediaDevices;
        return mediaDevices;
    };
    DesktopCameraService.prototype.getPhoto = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.getMediaDevices()
                .getUserMedia({ video: true, audio: false })
                .then(function (stream) {
                var vendorURL = window.URL || window.webkitURL;
                var doc = document;
                var videoElement = doc.createElement('video');
                videoElement.src = vendorURL.createObjectURL(stream);
                videoElement.play();
                var takePhotoInternal = function () {
                    var canvasElement = doc.createElement('canvas');
                    canvasElement.setAttribute('width', videoElement.videoWidth.toString());
                    canvasElement.setAttribute('height', videoElement.videoHeight.toString());
                    setTimeout(function () {
                        var context = canvasElement.getContext('2d');
                        context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
                        var url = canvasElement.toDataURL('image/png');
                        videoElement.pause();
                        if (stream.stop) {
                            stream.stop();
                        }
                        if (stream.getAudioTracks) {
                            stream.getAudioTracks().forEach(function (track) {
                                track.stop();
                            });
                        }
                        if (stream.getVideoTracks) {
                            stream.getVideoTracks().forEach(function (track) {
                                track.stop();
                            });
                        }
                        observer.next(url);
                        observer.complete();
                    }, 500);
                };
                if (videoElement.readyState >= videoElement.HAVE_FUTURE_DATA) {
                    takePhotoInternal();
                }
                else {
                    videoElement.addEventListener('canplay', function () {
                        takePhotoInternal();
                    }, false);
                }
            }, (function (error) {
                console.log(error);
            }));
        });
    };
    return DesktopCameraService;
}());
export { DesktopCameraService };
//# sourceMappingURL=desktopCamera.service.js.map