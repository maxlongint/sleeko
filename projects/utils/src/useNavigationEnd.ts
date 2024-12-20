import { assertInInjectionContext, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from './takeUntilDestroyed';

/**
 * 注入并返回一个可观察对象，该对象发出NavigationEnd事件
 * 此函数用于在组件中方便地获取路由导航结束的事件，以便执行某些操作，例如手动关闭导航指示器等
 * 注意：必须放在注入上下文中执行，监听无结果
 *
 * @returns 一个函数，当调用时，返回一个发出NavigationEnd事件的Observable
 */
export function useNavigationEnd(callback: (event: NavigationEnd) => void): void {
    assertInInjectionContext(useNavigationEnd);
    // 注入Router实例
    const router = inject(Router);

    // 使用RxJS操作符筛选NavigationEnd事件，并在组件销毁时取消订阅
    router.events
        .pipe(
            // 筛选条件：事件为NavigationEnd类型
            filter((event): event is NavigationEnd => event instanceof NavigationEnd),
            // 当组件销毁时，取消订阅，以避免内存泄漏
            takeUntilDestroyed()
        )
        .subscribe(callback);
}
