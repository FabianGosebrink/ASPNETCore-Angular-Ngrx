import { Configuration } from './app.configuration';
import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

describe('Configuration', () => {

    let service: Configuration;
    beforeEach(() => { service = new Configuration(); });

    it('Returns the correct title', () => {
        expect(service.title).toBe('Angular FoodChooser');
    });

    it('BaseUrl should be azure or localhost', () => {

        let possibleUrls = [
            'http://foodapi4demo.azurewebsites.net/api/',
            'http://localhost:5000/api/'
        ]

        expect(possibleUrls.indexOf(service.baseUrl)).toBeGreaterThanOrEqual(0);

    });

    it('BaseUrl ends with a slash', () => {

        let lastChar = service.baseUrl.slice(-1);
        expect(lastChar).toBe('/');

    });

    it('ToasterConfig is of Type "Toasterconfig"', () => {
        expect(service.toasterConfig).toEqual(jasmine.any(ToasterConfig))
    });

    it('ToasterConfig places toasts on the bottom right corner', () => {
        expect(service.toasterConfig.positionClass).toEqual('toast-bottom-right')
    });
});
