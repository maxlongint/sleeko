import { BehaviorSubject } from 'rxjs';
import { SessionStorage, LocalStorage, ISessionConfig, ILocalConfig } from './storage';

class TestComponent {
    @SessionStorage({ defaultValue: 'defaultSessionValue', propertyKey: 'sessionKey' })
    sessionValue!: BehaviorSubject<string>;

    @LocalStorage({ defaultValue: 'defaultLocalValue', propertyKey: 'localKey', expirationTime: 1000 })
    localValue!: BehaviorSubject<string>;
}

describe('Storage Decorators', () => {
    let testComponent: TestComponent;

    beforeEach(() => {
        testComponent = new TestComponent();
    });

    describe('SessionStorage', () => {
        it('should initialize with default value', () => {
            expect(testComponent.sessionValue.getValue()).toBe('defaultSessionValue');
        });

        it('should update session storage when value changes', () => {
            testComponent.sessionValue.next('newValue');
            expect(sessionStorage.getItem('sessionKey')).toBe(JSON.stringify({ value: 'newValue', version: '1.0.0' }));
        });

        it('should retrieve value from session storage on initialization', () => {
            sessionStorage.setItem('sessionKey', JSON.stringify({ value: 'storedValue', version: '1.0.0' }));
            const newComponent = new TestComponent();
            expect(newComponent.sessionValue.getValue()).toBe('storedValue');
        });

        it('should reset to default value if stored data is invalid', () => {
            sessionStorage.setItem('sessionKey', 'invalidData');
            const newComponent = new TestComponent();
            expect(newComponent.sessionValue.getValue()).toBe('defaultSessionValue');
        });
    });

    describe('LocalStorage', () => {
        it('should initialize with default value', () => {
            expect(testComponent.localValue.getValue()).toBe('defaultLocalValue');
        });

        it('should update local storage when value changes', () => {
            testComponent.localValue.next('newValue');
            const storedData = JSON.parse(localStorage.getItem('localKey')!);
            expect(storedData.value).toBe('newValue');
            expect(storedData.version).toBe('1.0.0');
            expect(storedData.expirationTime).toBeGreaterThan(Date.now());
        });

        it('should retrieve value from local storage on initialization', () => {
            localStorage.setItem(
                'localKey',
                JSON.stringify({ value: 'storedValue', version: '1.0.0', expirationTime: Date.now() + 1000 })
            );
            const newComponent = new TestComponent();
            expect(newComponent.localValue.getValue()).toBe('storedValue');
        });

        it('should reset to default value if stored data is expired', done => {
            localStorage.setItem(
                'localKey',
                JSON.stringify({ value: 'storedValue', version: '1.0.0', expirationTime: Date.now() - 1000 })
            );
            setTimeout(() => {
                const newComponent = new TestComponent();
                expect(newComponent.localValue.getValue()).toBe('defaultLocalValue');
                done();
            }, 0);
        });

        it('should reset to default value if stored data is invalid', () => {
            localStorage.setItem('localKey', 'invalidData');
            const newComponent = new TestComponent();
            expect(newComponent.localValue.getValue()).toBe('defaultLocalValue');
        });
    });
});
