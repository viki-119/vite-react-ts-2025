import type { RegistrableApp, LifeCycleFn } from 'qiankun';
import {
  globalStateManager,
  microAppEventBus,
  sharedUtils,
} from './common/micro-app-communication';

// 微应用配置
export const microApps: RegistrableApp<object>[] = [
  {
    name: 'vite-vue3-ts-2025', // 子应用名称
    entry: '//localhost:5174', // Vue3 子应用的地址
    container: '#subapp-container', // 子应用挂载的容器
    activeRule: '/vite-vue3-ts-2025', // 激活规则，当 URL 以 /vite-vue3-ts-2025 开头时激活该子应用
    props: {
      // 可以向子应用传递的数据
      mainAppData: {
        name: 'main-app',
        version: '1.0.0',
      },
      // 通信相关配置
      globalStateManager, // 全局状态管理
      microAppEventBus, // 事件总线
      utils: sharedUtils, // 共享工具函数
    },
  },
  // 可以添加更多子应用
];

// 定义生命周期钩子类型
type MicroAppLifeCycles = {
  beforeLoad?: LifeCycleFn<object>[];
  beforeMount?: LifeCycleFn<object>[];
  afterMount?: LifeCycleFn<object>[];
  beforeUnmount?: LifeCycleFn<object>[];
  afterUnmount?: LifeCycleFn<object>[];
};

// 全局生命周期钩子
export const microAppLifeCycles: MicroAppLifeCycles = {
  beforeLoad: [
    (app: { name: string }): Promise<void> => {
      console.log('[主应用] 子应用开始加载', app.name);
      return Promise.resolve();
    },
  ],
  beforeMount: [
    (app: { name: string }): Promise<void> => {
      console.log('[主应用] 子应用开始挂载', app.name);
      return Promise.resolve();
    },
  ],
  afterMount: [
    (app: { name: string }): Promise<void> => {
      console.log('[主应用] 子应用挂载完成', app.name);
      return Promise.resolve();
    },
  ],
  beforeUnmount: [
    (app: { name: string }): Promise<void> => {
      console.log('[主应用] 子应用开始卸载', app.name);
      // 在子应用卸载之前清除其全局状态监听器
      globalStateManager.clearAppListeners(app.name);
      return Promise.resolve();
    },
  ],
  afterUnmount: [
    (app: { name: string }): Promise<void> => {
      console.log('[主应用] 子应用卸载完成', app.name);
      return Promise.resolve();
    },
  ],
};
