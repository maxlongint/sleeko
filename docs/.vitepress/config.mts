import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Sleeko',
    base: '/sleeko/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
        outline: {
            label: '目录',
        },
        nav: [
            { text: '主页', link: '/' },
            { text: '文档说明', link: '/getting-started' },
        ],
        sidebar: [
            { text: '如何使用', link: '/getting-started' },
            {
                collapsed: false,
                text: '装饰器',
                items: [
                    { text: '缓存装饰器', link: '/decorators/stroage' },
                    { text: '防抖装饰器', link: '/decorators/debounce-time' },
                    { text: '节流装饰器', link: '/decorators/throttle-time' },
                ],
            },
            {
                collapsed: false,
                text: 'hooks',
                items: [
                    { text: '导航结束触发', link: '/hooks/use-navigation-end' },
                    { text: '路由查询参数传递、获取', link: '/hooks/use-query-params' },
                ],
            },
            {
                collapsed: false,
                text: '操作符',
                items: [{ text: '上下文销毁时完成订阅', link: '/operators/take-until-destroyed' }],
            },
            {
                collapsed: false,
                text: '工具',
                items: [{ text: '元素大小变化监听', link: '/tools/observeResize' }],
            },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/maxlongint/sleeko' },
            { icon: 'npm', link: 'https://www.npmjs.com/package/@sleeko/utils' },
        ],
    },
});
