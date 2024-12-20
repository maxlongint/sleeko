# useNavigationEnd

`useNavigationEnd` 是一个用于监听 Angular 路由导航结束事件的自定义 Hook。

::: tip 注意
此 Hook 适用于 Angular 的依赖注入上下文中，如果不在上下文中则会抛出错误。
:::

## 用法

```typescript
useNavigationEnd((event: NavigationEnd) => {
    // 在导航结束时执行的操作
    console.log('Navigation ended:', event);
});
```

## 参数

| 参数       | 类型                             | 描述                                                                    |
| ---------- | -------------------------------- | ----------------------------------------------------------------------- |
| `callback` | `(event: NavigationEnd) => void` | 当导航结束时调用的回调函数，接收一个 `NavigationEnd` 事件对象作为参数。 |

## 示例

<<< @/../src/app/test-example/use-navigation-end/use-navigation-end.component.ts#snippet{10-12}
