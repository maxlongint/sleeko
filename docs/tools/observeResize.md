# observeResize 工具函数

`observeResize` 函数用于监听 HTMLElement 元素的大小变化，并通过 RxJS 的 Observable 发出变化记录。

## 功能描述

此函数创建了一个 Observable，用于观察给定 HTMLElement 元素的大小变化。它使用了 ResizeObserver API 来实现，当元素的大小发生变化时，会发出一个包含变化记录的数组。

## 示例

```typescript
observeResize(document.getElementById('myElement')).subscribe(entries => {
    console.log('Element size changed:', entries);
});
```

## 参数

| 参数名    | 类型          | 默认值 | 描述                                  |
| --------- | ------------- | ------ | ------------------------------------- |
| `element` | `HTMLElement` | -      | 需要观察大小变化的 HTMLElement 元素。 |

## 返回值

| 类型                                | 描述                                                                                   |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| `Observable<ResizeObserverEntry[]>` | 返回一个 Observable，其中包含 ResizeObserverEntry 的数组，用于记录每次大小变化的信息。 |

## 清理资源

该函数返回的 Observable 在订阅时会自动开始观察指定元素的大小变化，并在取消订阅时清理资源，停止观察并断开与目标的连接。

### 示例代码

<<< @/../src/app/test-example/observe-resize/observe-resize.component.ts#snippet{15-19}
