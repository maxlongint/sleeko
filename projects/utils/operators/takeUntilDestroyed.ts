import { assertInInjectionContext, DestroyRef, inject } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * 操作符，当调用上下文（组件、指令、服务等）被销毁时，完成 Observable。
 *
 * @param destroyRef 可选参数，表示当前上下文的 `DestroyRef`。可以显式传递此参数以在[注入上下文](guide/di/dependency-injection-context)之外使用 `takeUntilDestroyed`。
 * 否则，将注入当前的 `DestroyRef`。
 *
 * @developerPreview
 * @deprecated 下个版本将废除
 */
export function takeUntilDestroyed<T>(destroyRef?: DestroyRef): MonoTypeOperatorFunction<T> {
    if (!destroyRef) {
        assertInInjectionContext(takeUntilDestroyed);
        destroyRef = inject(DestroyRef);
    }

    const destroyed$ = new Observable<void>(observer => {
        const unregisterFn = destroyRef!.onDestroy(observer.next.bind(observer));
        return unregisterFn;
    });

    return <T>(source: Observable<T>) => {
        return source.pipe(takeUntil(destroyed$));
    };
}
