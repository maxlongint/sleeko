# 缓存装饰器

缓存装饰器用于在浏览器中存储数据，以实现数据持久化。

::: tip 注意
缓存装饰器分为两种：`SessionStorage` 和 `LocalStorage`。

这两种装饰器均为 **属性装饰器**，只能用于类的属性； 并且类型需为 `BehaviorSubject<T>`。
:::

## 示例

`SessionStorage` 示例：

```typescript
class MyClass {
    @SessionStorage<number>({ defaultValue: 0 })
    count!: BehaviorSubject<number>;
}
```

`LocalStorage` 示例：

```typescript
class MyClass {
    @LocalStorage<number>({ defaultValue: 0, expirationTime: 10 * 1000 })
    count!: BehaviorSubject<number>;
}
```

## 参数

| 参数名           | 类型     | 默认值  | 描述                                     |
| ---------------- | -------- | ------- | ---------------------------------------- |
| `defaultValue`   | `any`    | `null`  | 缓存的值，若为空则使用属性值作为默认值。 |
| `propertyKey`    | `string` | `null`  | 缓存的键名，若为空则使用属性名作为键名。 |
| `version`        | `string` | `1.0.0` | 缓存的版本号，若为空则使用默认版本号。   |
| `expirationTime` | `number` | `null`  | 缓存的过期时间，单位为毫秒。             |

::: info 说明
`expirationTime` 参数仅在使用 `LocalStorage` 时有效。
:::

## 用法

缓存装饰器由于类型是`BehaviorSubject<T>`，所以可以直接使用 `next()` 方法来修改缓存的值；并且通过 `.value` 属性来获取缓存的值。

::: code-group

<<< @/../src/app/test-example/storage/storage.component.html

<<< @/../src/app/test-example/storage/storage.component.ts#snippet{11,12}

:::
