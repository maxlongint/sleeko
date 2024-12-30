# takeUntilDestroyed 操作符

`takeUntilDestroyed` 操作符用于在调用上下文（组件、指令、服务等）被销毁时，完成 Observable。

::: tip 注意
此操作符适用于 Angular 的依赖注入上下文中，如果不在上下文中则需要传递 `DestroyRef`
:::

## 示例

```typescript{4}
interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(val => console.log(val));
```

## 参数

| 参数名       | 类型         | 默认值 | 描述                                                                                                                                                                  |
| ------------ | ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `destroyRef` | `DestroyRef` | `null` | 可选参数，表示当前上下文的 `DestroyRef`。可以显式传递此参数以在[注入上下文](https://angular.dev/guide/di/dependency-injection-context)之外使用 `takeUntilDestroyed`。 |

## 用法

`takeUntilDestroyed` 操作符可以应用于任何 Observable，通过传递 `destroyRef` 参数来控制销毁时机。当调用上下文被销毁时，Observable 将自动完成。

### 示例代码

::: code-group
<<< @/../src/app/test-example/take-until-destroyed/take-until-destroyed.component.ts#snippet{15}
:::
