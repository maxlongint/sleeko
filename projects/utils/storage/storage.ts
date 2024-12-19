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
        propertyKey = `@${config.propertyKey ?? propertyKey}`;
        const storedValue: string | null = storage.getItem(propertyKey);
        let parsedValue: typeof config.defaultValue = config.defaultValue;
        const version = config.version ?? '1.0.0';

        try {
            const storedData = storedValue ? JSON.parse(storedValue) : null;
            if (storedData) {
                parsedValue = storedData.value ?? config.defaultValue;
                if (config.expirationTime && storedData.expirationTime < Date.now()) {
                    storage.removeItem(propertyKey);
                    parsedValue = config.defaultValue;
                } else if (storedData.version !== version) {
                    storage.removeItem(propertyKey);
                    parsedValue = config.defaultValue;
                }
            }
        } catch (error) {
            console.error(`Error parsing stored value for ${propertyKey}:`, error);
        }

        const subject = new BehaviorSubject<typeof config.defaultValue>(parsedValue);

        subject.subscribe(value => {
            if (value == null) {
                storage.removeItem(propertyKey);
                subject.next(config.defaultValue);
            } else {
                try {
                    storage.setItem(
                        propertyKey,
                        JSON.stringify({
                            value,
                            version,
                            ...(config.expirationTime ? { expirationTime: Date.now() + config.expirationTime } : {}),
                        })
                    );
                } catch (error) {
                    console.error(`Error storing value for ${propertyKey}:`, error);
                }
            }
        });

        return subject;
    };
}

/**
 * 创建存储装饰器
 * @param storage 存储对象
 * @param config 存储配置
 * @returns 存储装饰器函数
 */
function createStorageDecorator<T>(storage: Storage, config: IStorageConfig<T>) {
    return function (target: Object, propertyKey: string): void {
        const storageSubject = storageFactory(storage, propertyKey)(config);
        Object.defineProperty(target, propertyKey, {
            get: () => storageSubject,
            enumerable: true,
            configurable: true,
        });
    };
}

/**
 * 会话存储装饰器
 * @param config 会话存储配置
 */
function SessionStorage<T>(config: ISessionConfig<T>) {
    return createStorageDecorator(sessionStorage, config);
}

/**
 * 本地存储装饰器
 * @param config 本地存储配置
 */
function LocalStorage<T>(config: ILocalConfig<T>) {
    return createStorageDecorator(localStorage, config);
}

export { SessionStorage, LocalStorage };
