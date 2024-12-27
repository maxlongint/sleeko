import { Observable } from 'rxjs';

/**
 * 监听元素的大小变化
 *
 * 此函数创建了一个Observable，用于观察给定HTMLElement元素的大小变化它使用了ResizeObserver API来实现
 * 当元素的大小发生变化时，会发出一个包含变化记录的数组
 *
 * @param element 需要观察大小变化的HTMLElement元素
 * @returns 返回一个Observable，其中包含ResizeObserverEntry的数组，用于记录每次大小变化的信息
 */
export function observeResize(element: HTMLElement): Observable<ResizeObserverEntry[]> {
    return new Observable(observer => {
        // 创建ResizeObserver实例，当观察的目标元素大小发生变化时，会调用回调函数
        const resizeObserver = new ResizeObserver(entries => {
            observer.next(entries);
        });
        // 开始观察指定的元素
        resizeObserver.observe(element);
        // 返回一个函数，用于在停止观察时调用，以清理资源
        return () => {
            // 停止观察指定的元素
            resizeObserver.unobserve(element);
            // 断开与所有目标的观察连接
            resizeObserver.disconnect();
        };
    });
}
