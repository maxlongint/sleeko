import { BehaviorSubject } from 'rxjs';

/**
 * 存储配置的基本接口
 */
interface IStorageConfig<T> {
    /**
     * 存储的默认值
     */
    defaultValue: T;

    /**
     * 属性键（可选）
     */
    propertyKey?: string;

    /**
     * 版本（可选）
     * 默认为 1.0.0
     */
    version?: string;
}

/**
 * 会话存储配置接口
 */
export interface ISessionConfig<T = unknown> extends IStorageConfig<T> {}

/**
 * 本地存储配置接口
 */
export interface ILocalConfig<T = unknown> extends IStorageConfig<T> {
    /**
     * 过期时间（毫秒）（可选）
     */
    expirationTime?: number;
}

/**
 * 创建一个存储工厂函数
 * @param storage 存储对象（如 sessionStorage 或 localStorage）
 * @param propertyKey 属性键
 * @returns 一个返回 BehaviorSubject 的函数
 */
function storageFactory(storage: Storage, propertyKey: string) {
    return (config: ISessionConfig & ILocalConfig): BehaviorSubject<typeof config.defaultValue> => {
        propertyKey = `@${config.propertyKey ?? propertyKey}`; // 使用配置中的属性键，如果没有则使用传入的属性键
        const storedValue: string | null = storage.getItem(propertyKey); // 从存储中获取值
        let parsedValue: typeof config.defaultValue; // 解析后的值
        let version = config.version ?? '1.0.0'; // 版本号，默认为 1.0.0

        try {
            const storedData = storedValue ? JSON.parse(storedValue) : null; // 尝试解析存储的值
            if (storedData) {
                parsedValue = storedData.value ?? config.defaultValue; // 获取存储的值或默认值
                if (config.expirationTime) {
                    const expiry = storedData.expirationTime; // 获取过期时间
                    if (expiry && expiry < Date.now()) {
                        storage.removeItem(propertyKey); // 如果已过期，删除存储项
                        parsedValue = config.defaultValue; // 使用默认值
                    }
                } else if (storedData.version !== version) {
                    storage.removeItem(propertyKey); // 如果版本不匹配，删除存储项
                    parsedValue = config.defaultValue; // 使用默认值
                }
            }
        } catch (error) {
            console.error(`Error parsing stored value for ${propertyKey}:`, error); // 捕获解析错误
            parsedValue = config.defaultValue; // 使用默认值
        }

        const subject = new BehaviorSubject<typeof config.defaultValue>(parsedValue); // 创建一个 BehaviorSubject

        subject.subscribe(value => {
            if (value == null) {
                storage.removeItem(propertyKey); // 如果值为 null，删除存储项
                subject.next(config.defaultValue); // 发送默认值
            } else {
                try {
                    // 将新值存储到存储对象中
                    storage.setItem(
                        propertyKey,
                        JSON.stringify({
                            value,
                            version,
                            ...(config.expirationTime ? { expirationTime: Date.now() + config.expirationTime } : {}),
                        })
                    );
                } catch (error) {
                    console.error(`Error storing value for ${propertyKey}:`, error); // 捕获存储错误
                }
            }
        });

        return subject; // 返回 BehaviorSubject
    };
}

/**
 * 会话存储装饰器
 * @param config 会话存储配置
 */
function SessionStorage<T>(config: ISessionConfig<T>) {
    return function (target: Object, propertyKey: string): void {
        const sessionStorageSubject = storageFactory(sessionStorage, propertyKey)(config); // 创建会话存储工厂
        Object.defineProperty(target, propertyKey, {
            get: () => sessionStorageSubject, // 定义属性的 getter
            enumerable: true,
            configurable: true,
        });
    };
}

/**
 * 本地存储装饰器
 * @param config 本地存储配置
 */
function LocalStorage<T>(config: ILocalConfig<T>) {
    return function (target: Object, propertyKey: string): void {
        const sessionStorageSubject = storageFactory(localStorage, propertyKey)(config); // 创建本地存储工厂
        Object.defineProperty(target, propertyKey, {
            get: () => sessionStorageSubject, // 定义属性的 getter
            enumerable: true,
            configurable: true,
        });
    };
}

export { SessionStorage, LocalStorage }; // 导出会话存储和本地存储装饰器
