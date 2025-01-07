# useNavigate 和 useQueryParams

`useNavigate` 和 `useQueryParams` 是用于处理 Angular 路由查询参数的自定义 Hook，主要用于对 **查询参数** 进行 base64 编码和解码，并在 URL 中安全地显示。

例如：`child?params=JTdCJTIyaGVsb2wlMjIlM0ElMjJ3b3JsZCUyMiU3RA%3D%3D`

::: tip 注意
此 Hook 适用于 Angular 的依赖注入上下文中，如果不在上下文中则会抛出错误。
:::

## 用法

### 导航并附带查询参数

```typescript
import { useNavigate } from '@sleeko/utils/hooks';

const navigate = useNavigate<{ name: string; age: number }>();

// 父路由添加参数并跳转
navigate('some-url', { name: '张三', age: 18 });
```

### 获取当前查询参数

```typescript
import { useQueryParams } from '@sleeko/utils/hooks';

const queryParams$ = useQueryParams<{ name: string; age: number }>();

// 订阅查询参数
queryParams$.subscribe(params => {
    console.log(params); // 输出: { name: '张三', age: 18 }
});
```

## 返回值

|                  | 类型                                                | 描述                                                    |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------- |
| `useNavigate`    | `(url: string, queryParams: T) => Promise<boolean>` | 导航到指定 URL 并附带查询参数，返回导航结果的 Promise。 |
| `useQueryParams` | `() => Observable<T>`                               | 获取当前的查询参数对象的 Observable。                   |

## 示例

::: code-group

<<< @/../src/app/test-example/use-query-params/use-query-params.component.html#snippet{1} [parent.html]

<<< @/../src/app/test-example/use-query-params/use-query-params.component.ts#snippet{10,13} [parent.ts]

<<< @/../src/app/test-example/use-query-params/query-params-child/query-params-child.component.html#snippet{1} [child.html]

<<< @/../src/app/test-example/use-query-params/query-params-child/query-params-child.component.ts#snippet{10} [child.ts]

:::
