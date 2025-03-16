import { RegistrableApp, RegisterMicroAppsOpts } from 'qiankun';

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
    },
  },
  // 可以添加更多子应用
];

// 全局生命周期钩子
export const microAppLifeCycles: RegisterMicroAppsOpts = {
  beforeLoad: [
    (app: object): Promise<void> => {
      console.log('[主应用] 子应用开始加载', app.name);
      return Promise.resolve();
    },
  ],
  beforeMount: [
    app => {
      console.log('[主应用] 子应用开始挂载', app.name);
      return Promise.resolve();
    },
  ],
  afterMount: [
    app => {
      console.log('[主应用] 子应用挂载完成', app.name);
      return Promise.resolve();
    },
  ],
  beforeUnmount: [
    app => {
      console.log('[主应用] 子应用开始卸载', app.name);
      return Promise.resolve();
    },
  ],
  afterUnmount: [
    app => {
      console.log('[主应用] 子应用卸载完成', app.name);
      return Promise.resolve();
    },
  ],
};
