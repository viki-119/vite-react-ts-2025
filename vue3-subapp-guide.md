# Vue3 子应用接入乾坤指南

这个指南将帮助你将 Vue3 子应用（<https://github.com/viki-119/vite-vue3-ts-2025.git）配置为乾坤微前端架构的子应用。>

## 步骤 1: 安装依赖

在子应用项目中安装 qiankun 相关依赖：

```bash
cd vite-vue3-ts-2025
npm install vite-plugin-qiankun -D
```

## 步骤 2: 修改 Vite 配置

修改 `vite.config.ts` 文件：

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('vue3-sub-app', {
      // 子应用名称，需要与主应用中注册的名称一致
      useDevMode: true,
    }),
  ],
  server: {
    port: 5173,
    cors: true,
    origin: 'http://localhost:5173',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 确保正确的基础路径
  base: process.env.NODE_ENV === 'production' ? '/vite-vue3-ts-2025/' : '/',
});
```

## 步骤 3: 修改入口文件

修改 `src/main.ts` 文件，添加乾坤生命周期：

```typescript
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import App from './App.vue';
import routes from './router';

let app: any;
let router: any;
let history: any;

function render(props: any = {}) {
  const { container } = props;
  history = createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vite-vue3-ts-2025' : '/');
  router = createRouter({
    history,
    routes,
  });

  app = createApp(App);
  app.use(router);
  app.mount(container ? container.querySelector('#app') : '#app');
}

// 判断是否在乾坤环境下运行
renderWithQiankun({
  mount(props) {
    console.log('vue3子应用 mount');
    render(props);
  },
  bootstrap() {
    console.log('vue3子应用 bootstrap');
  },
  unmount(props: any) {
    console.log('vue3子应用 unmount');
    app.unmount();
    app = null;
    router = null;
    history = null;
  },
  update(props: any) {
    console.log('vue3子应用 update');
    console.log(props);
  },
});

// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}
```

## 步骤 4: 修改 App.vue

确保 App.vue 的根元素有 id="app"：

```vue
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```

## 步骤 5: 启动子应用

启动子应用：

```bash
cd vite-vue3-ts-2025
npm run dev
```

## 步骤 6: 在主应用中访问

确保主应用正在运行（<http://localhost:8000），然后点击"Vue3子应用"链接，即可访问集成的子应用。>

## 常见问题

1. **跨域问题**：确保子应用的 CORS 配置正确。
2. **资源加载问题**：确保子应用的资源路径是正确的，尤其是在生产环境。
3. **路由冲突**：确保子应用的路由与主应用不冲突。
