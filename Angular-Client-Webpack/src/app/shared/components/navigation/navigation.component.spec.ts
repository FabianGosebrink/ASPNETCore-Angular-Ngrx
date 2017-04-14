import { Configuration } from './../../configuration/app.configuration';
import { NavigationComponent } from './navigation.component';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NavigationComponent', () => {

    let fixture: ComponentFixture<NavigationComponent>;
    let comp: NavigationComponent;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationComponent],
            providers: [
                Configuration
            ]
        }).compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges(); // trigger initial data binding
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('component should be instanciated', () => {
        expect(comp).toBeDefined();
    });

    it('configuration should be defined', inject([Configuration], (service: Configuration) => {
        expect(comp._configuration).toBeDefined();
    }));

    it('Title is displayed correctly', inject([Configuration], (service: Configuration) => {
        let de: DebugElement;
        let el: HTMLElement;
        de = fixture.debugElement.query(By.css('.navbar-brand'));
        el = de.nativeElement;
        expect(el.innerText).toContain(service.title);
    }));
});

