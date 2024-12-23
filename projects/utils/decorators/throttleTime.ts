import { Subject, Subscription, throttleTime } from 'rxjs';

/**
 * 装饰器工厂函数，用于为方法添加节流功能。
 * @param timer - 节流时间间隔，单位为毫秒。
 */
export function ThrottleTime(timer: number) {
    return function (_target: Object, _propertyKey: string, descriptor: PropertyDescriptor): void {
        const originalMethod = descriptor.value;
        const subject = new Subject<any>();
        let subscription: Subscription;

        descriptor.value = function (...args: any[]) {
            if (!subscription) {
                subscription = subject.pipe(throttleTime(timer)).subscribe(args => {
                    originalMethod.apply(this, args);
                });
            }
            subject.next(args);
        };
    };
}
