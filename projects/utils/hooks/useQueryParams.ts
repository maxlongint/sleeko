import { assertInInjectionContext, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

/**
 * 编码查询参数为字符串
 * @param queryParams - 查询参数对象
 * @returns 编码后的字符串
 */
function encode<T>(queryParams: T): string {
    return btoa(encodeURIComponent(JSON.stringify(queryParams)));
}

/**
 * 解码字符串为查询参数
 * @param encodedParams - 编码后的字符串
 * @returns 解码后的查询参数对象
 */
function decode<T>(encodedParams: string): T {
    return JSON.parse(decodeURIComponent(atob(encodedParams)));
}

/**
 * 导航到指定URL并附带查询参数
 *
 * 该函数主要用于在应用中实现页面跳转，并允许在跳转时传递查询参数
 * 它依赖于注入的Router实例来执行实际的导航操作
 *
 * @template T 泛型参数，表示查询参数的类型，默认为Params类型
 * @returns 返回一个函数，该函数接受一个URL和一组查询参数，并返回一个Promise<boolean>
 */
export function useNavigateTo<T = Params>(): (url: string, queryParams: T) => Promise<boolean> {
    // 确保useNavigateTo在适当的上下文中被调用
    assertInInjectionContext(useNavigateTo);
    // 注入Router实例，用于执行导航操作
    const router = inject(Router);
    // 返回一个函数，用于执行实际的导航操作
    return (url: string, queryParams: T): Promise<boolean> => {
        // 使用Router实例的navigate方法进行页面跳转，并传递查询参数
        return router.navigate([url], { queryParams: { params: encode<T>(queryParams) } });
    };
}

/**
 * 自定义钩子用于获取查询参数的值
 * 它可以在Angular的注入上下文中使用， typically used in Angular components or services
 * This hook helps to retrieve and decode the query parameters from the current route snapshot
 *
 * @template T 泛型参数，表示查询参数的类型，默认为Params类型
 * @returns 返回一个函数，当调用该函数时，它会解析并返回当前路由快照的查询参数
 *
 * 此函数的实现依赖于Angular的依赖注入系统，以获取当前激活的路由（ActivatedRoute）
 * 通过调用inject函数来获取ActivatedRoute实例，然后从其snapshot的queryParams中提取params属性
 * 最后，使用decode函数对params进行解码，以确保查询参数被正确地解析为预期的类型T
 */
export function useQueryParamsValue<T = Params>(): () => T {
    assertInInjectionContext(useQueryParamsValue);
    const activatedRoute = inject(ActivatedRoute);
    return (): T => {
        const { params } = activatedRoute.snapshot.queryParams;
        return decode<T>(params);
    };
}
