import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Sleeko',
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
                    { text: '缓存装饰器', link: '/decorators/cache-stroage' },
                    { text: '防抖装饰器', link: '/decorators/debounce-time' },
                ],
            },
        ],
        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    },
});
