import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * 装饰器工厂函数，用于为方法添加防抖功能。
 * @param timer - 防抖时间间隔，单位为毫秒; 默认是：300ms
 */
export function DebounceTime(timer: number = 300) {
    return function (_target: Object, _propertyKey: string, descriptor: PropertyDescriptor): void {
        // 保存原始方法的引用
        const originalMethod = descriptor.value;
        // 创建一个 Subject 实例，用于接收方法调用的参数
        const subject = new Subject<any>();
        // 用于存储订阅对象，以便后续取消订阅
        let subscription: Subscription;

        /**
         * 重写原始方法，使其具有防抖功能。
         * @param args - 原始方法的参数。
         */
        descriptor.value = function (...args: any[]) {
            // 如果还没有创建订阅，则创建一个新的订阅
            if (!subscription) {
                // 应用防抖操作符
                subscription = subject.pipe(debounceTime(timer)).subscribe(args => {
                    // 在防抖时间结束后调用原始方法
                    originalMethod.apply(this, args);
                });
            }
            // 将参数传递给 Subject，触发防抖逻辑
            subject.next(args);
        };
    };
}
