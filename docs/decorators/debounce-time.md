# 防抖装饰器

防抖装饰器用于为方法添加防抖功能，以减少频繁调用方法的次数。

::: tip 注意
此装饰器仅适用于类的 **方法** 上。
:::

## 示例

```typescript{4}
import { DebounceTime } from '@sleeko/utils/debounceTime';

class MyClass {
    @DebounceTime(500)
    myMethod(): void {
        console.log(`log: ${+new Date()}`);
    }
}
```

## 参数

| 参数名  | 类型     | 默认值 | 描述                       |
| ------- | -------- | ------ | -------------------------- |
| `timer` | `number` | `300`  | 防抖时间间隔，单位为毫秒。 |

## 用法

防抖装饰器可以应用于任何类的方法，通过设置 `timer` 参数来控制防抖的时间间隔。当方法被频繁调用时，只有在最后一次调用后经过指定的时间间隔才会真正执行方法。

### 示例代码

::: code-group

<<< @/../src/app/test-example/debounce-time/debounce-time.component.html

<<< @/../src/app/test-example/debounce-time/debounce-time.component.ts#snippet{10-13}

:::
