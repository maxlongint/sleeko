import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * 装饰器工厂函数，用于为方法添加防抖功能。
 * @param timer - 防抖时间间隔，单位为毫秒; 默认是：300ms
 */
export function DebounceTime(timer: number = 300) {
    return function (_target: Object, _propertyKey: string, descriptor: PropertyDescriptor): void {
        const originalMethod = descriptor.value;
        const subject = new Subject<any>();
        let subscription: Subscription;

        descriptor.value = function (...args: any[]) {
            if (!subscription) {
                subscription = subject.pipe(debounceTime(timer)).subscribe(args => {
                    originalMethod.apply(this, args);
                });
            }
            subject.next(args);
        };
    };
}
