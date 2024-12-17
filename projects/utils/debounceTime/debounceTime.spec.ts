import { DebounceTime } from './debounceTime';

describe('DebounceTime Decorator', () => {
    class TestClass {
        public callCount = 0;

        @DebounceTime(50)
        public testMethod(...args: any[]): void {
            this.callCount++;
        }
    }

    let testInstance: TestClass;

    beforeEach(() => {
        testInstance = new TestClass();
    });

    it('should debounce method calls', done => {
        testInstance.testMethod();
        testInstance.testMethod();
        testInstance.testMethod();

        setTimeout(() => {
            expect(testInstance.callCount).toBe(1);
            done();
        }, 100);
    });

    it('should not call the method if no calls are made within the debounce time', done => {
        testInstance.testMethod();

        setTimeout(() => {
            expect(testInstance.callCount).toBe(1);
        }, 60);

        setTimeout(() => {
            expect(testInstance.callCount).toBe(1);
            done();
        }, 120);
    });

    it('should call the method again after the debounce time has passed without additional calls', done => {
        testInstance.testMethod();

        setTimeout(() => {
            expect(testInstance.callCount).toBe(1);
            testInstance.testMethod();
        }, 60);

        setTimeout(() => {
            expect(testInstance.callCount).toBe(2);
            done();
        }, 120);
    });
});
