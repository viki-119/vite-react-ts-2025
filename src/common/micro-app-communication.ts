import { initGlobalState, MicroAppStateActions, OnGlobalStateChangeCallback } from 'qiankun';

// 定义全局状态
const initialState = {
  user: null as { id: string; name: string; role: string; lastUpdate: number } | null,
  theme: 'light' as 'light' | 'dark',
  language: 'zh-CN',
  message: '',
  timestamp: 0,
  from: '',
  subAppData: null,
  // 可以添加更多全局状态
};

type GlobalState = typeof initialState;

// 初始化全局状态
const actions: MicroAppStateActions = initGlobalState(initialState);

// 全局状态管理
export const globalStateManager = {
  // 获取状态
  getGlobalState(): GlobalState {
    return initialState;
  },

  // 设置状态
  setGlobalState(state: Partial<GlobalState>): void {
    actions.setGlobalState(state);
  },

  // 监听状态变化
  onGlobalStateChange(callback: OnGlobalStateChangeCallback) {
    return actions.onGlobalStateChange(callback);
  },

  // 清除特定监听器
  offGlobalStateChange() {
    return actions.offGlobalStateChange();
  },

  // 跟踪子应用的监听器
  _appListeners: new Map<string, OnGlobalStateChangeCallback[]>(),

  // 为特定子应用注册监听器（带自动清理功能）
  registerAppListener(appName: string, callback: OnGlobalStateChangeCallback) {
    // 存储这个监听器
    if (!this._appListeners.has(appName)) {
      this._appListeners.set(appName, []);
    }
    this._appListeners.get(appName)?.push(callback);

    // 注册监听器
    return this.onGlobalStateChange(callback);
  },

  // 清除特定子应用的所有监听器
  clearAppListeners(appName: string) {
    const listeners = this._appListeners.get(appName) || [];

    // 清除监听器
    if (listeners.length > 0) {
      this.offGlobalStateChange();
    }

    // 清空存储
    this._appListeners.set(appName, []);
    console.log(`[主应用] 已清除 ${appName} 的所有全局状态监听器`);
  },
};

// 事件总线接口定义
interface IEventBus {
  on(event: string, handler: (...args: any[]) => void): void;
  off(event: string, handler: (...args: any[]) => void): void;
  emit(event: string, ...args: any[]): void;
}

// 事件总线实现
class EventBus implements IEventBus {
  private handlers = new Map<string, Array<(...args: any[]) => void>>();

  on(event: string, handler: (...args: any[]) => void): void {
    const handlers = this.handlers.get(event) || [];
    handlers.push(handler);
    this.handlers.set(event, handlers);
  }

  off(event: string, handler: (...args: any[]) => void): void {
    const handlers = this.handlers.get(event);
    if (!handlers) return;
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }

  emit(event: string, ...args: any[]): void {
    const handlers = this.handlers.get(event);
    handlers?.forEach(handler => handler(...args));
  }
}

// 创建事件总线实例
export const microAppEventBus = new EventBus();

// 共享工具函数
export const sharedUtils = {
  // 格式化日期
  formatDate(date: Date): string {
    return date.toISOString();
  },

  // 生成唯一ID
  generateUUID(): string {
    return crypto.randomUUID();
  },

  // 防抖函数
  debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  // 节流函数
  throttle<T extends (...args: any[]) => void>(
    fn: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle = false;
    return function (this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};
