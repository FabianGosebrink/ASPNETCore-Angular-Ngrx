import { Observable } from 'rxjs/Rx';
var MobileCameraService = (function () {
    function MobileCameraService() {
        this.getPhoto = function () {
            return Observable.create(function (observer) {
                var removeDomListener = function () {
                    document.removeEventListener('deviceready', onCordovaDeviceReady);
                };
                var onCordovaDeviceReady = function () {
                    var camera = window.navigator.camera;
                    var options = {
                        quality: 100,
                        destinationType: camera.DestinationType.DATA_URL,
                        sourceType: camera.PictureSourceType.CAMERA,
                        encodingType: camera.EncodingType.PNG,
                        pictureSourceType: camera.PictureSourceType.CAMERA,
                        saveToPhotoAlbum: false,
                        targetWidth: 640,
                        targetHeight: 640,
                        correctOrientation: true
                    };
                    // let options = {
                    //     quality: 100,
                    //     destinationType: camera.DestinationType.DATA_URL,
                    //     sourceType: camera.PictureSourceType.CAMERA,
                    //     allowEdit: true,
                    //     encodingType: camera.EncodingType.PNG,
                    //     saveToPhotoAlbum: false,
                    //     correctOrientation: true
                    // };
                    camera.getPicture(function (imageData) {
                        observer.next('data:image/png;base64,' + imageData);
                        removeDomListener();
                        observer.complete();
                    }, function (error) {
                        observer.error(error);
                        removeDomListener();
                        observer.complete();
                    }, options);
                };
                document.addEventListener('deviceready', onCordovaDeviceReady);
            });
        };
        console.log('MobileCameraService');
    }
    return MobileCameraService;
}());
export { MobileCameraService };
//# sourceMappingURL=mobileCamera.service.js.map