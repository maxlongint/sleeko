# useQueryParams

`useQueryParams` 是一个用于处理 Angular 路由查询参数的自定义 Hook，用于对 **查询参数** 进行 base64 加密显示在 URL 上。

例如：`child?params=JTdCJTIyaGVsbG8lMjIlM0ElMjJ3b3JsZCUyMiU3RA%3D%3D`

::: tip 注意
此 Hook 适用于 Angular 的依赖注入上下文中，如果不在上下文中则会抛出错误。
:::

## 用法

```typescript
queryParams = useQueryParams<{ name: string; age: number }>();

// 父路由添加参数并跳转
queryParams.navigate('some-url', { name: '张三', age: 18 });

// 子路由获得参数
console.log(queryParams.value()); // 输出: { name: '张三', age: 18 }
```

## 返回值

| 返回值     | 类型                                                | 描述                                                    |
| ---------- | --------------------------------------------------- | ------------------------------------------------------- |
| `navigate` | `(url: string, queryParams: T) => Promise<boolean>` | 导航到指定 URL 并附带查询参数，返回导航结果的 Promise。 |
| `value`    | `() => T`                                           | 获取当前的查询参数对象。                                |

## 示例

以下是一个完整的示例，展示了如何在父组件和子组件中使用 `useQueryParams`。

::: code-group

<<< @/../src/app/test-example/use-query-params/use-query-params.component.html#snippet{1} [parent.html]

<<< @/../src/app/test-example/use-query-params/use-query-params.component.ts#snippet{10,13} [parent.ts]

<<< @/../src/app/test-example/use-query-params/query-params-child/query-params-child.component.ts#snippet{10,13} [child.ts]

:::

## 注意事项

1. 确保在 Angular 的依赖注入上下文中使用此 Hook。
2. 查询参数会被 base64 编码，因此在 URL 中显示相对安全。
3. 使用 `navigate` 方法时，确保传递的查询参数对象符合泛型定义。
