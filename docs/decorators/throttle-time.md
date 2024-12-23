# 节流装饰器

节流装饰器用于为方法添加节流功能，以减少频繁调用方法的次数。与防抖不同的是，节流会在指定的时间间隔内只允许一次方法执行。

::: tip 注意
此装饰器仅适用于类的 **方法** 上。
:::

## 示例

```typescript
class MyClass {
    @ThrottleTime(500)
    myMethod(): void {
        console.log(`log: ${+new Date()}`);
    }
}
```

## 参数

| 参数名  | 类型     | 默认值 | 描述                       |
| ------- | -------- | ------ | -------------------------- |
| `timer` | `number` | -      | 节流时间间隔，单位为毫秒。 |

## 用法

节流装饰器可以应用于任何类的方法，通过设置 `timer` 参数来控制节流的时间间隔。当方法被频繁调用时，在每个时间间隔内只会执行一次方法。

## 示例代码

::: code-group

<<< @/../src/app/test-example/throttle-time/throttle-time.component.html

<<< @/../src/app/test-example/throttle-time/throttle-time.component.ts#snippet{10-13}

:::
