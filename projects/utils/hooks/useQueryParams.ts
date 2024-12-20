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
 * useQueryParams 返回值类型
 */
export interface UseQueryParamsResult<T> {
    /**
     * 导航到指定URL并附带查询参数
     * @param url - 目标URL
     * @param queryParams - 查询参数对象
     * @returns 导航结果的Promise
     */
    navigate: (url: string, queryParams: T) => Promise<boolean>;

    /**
     * 获取当前的查询参数
     * @returns 当前的查询参数对象
     */
    value: () => T;
}

/**
 * 自定义 Hook，用于处理查询参数
 * @returns 包含导航和获取查询参数的方法
 */
export function useQueryParams<T = Params>(): UseQueryParamsResult<T> {
    assertInInjectionContext(useQueryParams);
    const router = inject(Router);
    const activatedRoute = inject(ActivatedRoute);

    return {
        /**
         * 导航到指定URL并附带查询参数
         * @param url - 目标URL
         * @param queryParams - 查询参数对象
         * @returns 导航结果的Promise
         */
        navigate: (url: string, queryParams: T): Promise<boolean> => {
            return router.navigate([url], { queryParams: { params: encode<T>(queryParams) } });
        },
        /**
         * 获取当前的查询参数
         * @returns 当前的查询参数对象
         */
        value: (): T => {
            const { params } = activatedRoute.snapshot.queryParams;
            return decode<T>(params);
        },
    };
}
