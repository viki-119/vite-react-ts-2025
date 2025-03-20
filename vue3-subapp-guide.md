# Vue3 子应用使用指南

## 1. 创建事件总线工具

首先，创建一个工具文件来管理事件总线：

```typescript
// src/utils/eventBus.ts
let eventBus: any = null;

export function setEventBus(bus: any) {
  eventBus = bus;
}

export function getEventBus() {
  return eventBus;
}
```

## 2. 在入口文件中初始化

在子应用的入口文件中初始化事件总线：

```typescript
// src/main.ts
import { setEventBus } from './utils/eventBus';

// 子应用的生命周期 - mount
export async function mount(props: any) {
  // 保存事件总线实例
  setEventBus(props.eventBus);

  // 挂载 Vue 应用
  render(props);
}
```

## 3. 在 Vue 组件中使用

### 3.1 选项式 API 组件示例

```vue
<!-- src/components/MessageComponent.vue -->
<template>
  <div class="message-component">
    <div class="received-message" v-if="message">收到消息: {{ message }}</div>

    <div class="message-sender">
      <input v-model="inputMessage" placeholder="输入要发送的消息" />
      <button @click="sendMessage">发送到主应用</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getEventBus } from '../utils/eventBus';

export default defineComponent({
  name: 'MessageComponent',
  data() {
    return {
      message: '',
      inputMessage: '',
    };
  },
  created() {
    // 监听主应用消息
    const eventBus = getEventBus();
    if (eventBus) {
      eventBus.on('main:message', this.handleMainMessage);
    }
  },
  beforeUnmount() {
    // 清理监听器
    const eventBus = getEventBus();
    if (eventBus) {
      eventBus.off('main:message', this.handleMainMessage);
    }
  },
  methods: {
    handleMainMessage(data: any) {
      this.message = typeof data === 'object' ? data.content : data;
    },
    sendMessage() {
      const eventBus = getEventBus();
      if (eventBus && this.inputMessage) {
        eventBus.emit('sub:message', {
          content: this.inputMessage,
          timestamp: Date.now(),
          from: 'vue3-sub-app',
        });
        this.inputMessage = ''; // 清空输入
      }
    },
  },
});
</script>

<style scoped>
.message-component {
  padding: 20px;
}

.received-message {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.message-sender {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #40a9ff;
}
</style>
```

### 3.2 组合式 API 组件示例

```vue
<!-- src/components/ComposableMessage.vue -->
<template>
  <div class="message-component">
    <div class="received-message" v-if="message">收到消息: {{ message }}</div>

    <div class="message-sender">
      <input v-model="inputMessage" placeholder="输入要发送的消息" />
      <button @click="sendMessage">发送到主应用</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getEventBus } from '../utils/eventBus';

const message = ref('');
const inputMessage = ref('');

// 处理主应用消息
const handleMainMessage = (data: any) => {
  message.value = typeof data === 'object' ? data.content : data;
};

// 发送消息到主应用
const sendMessage = () => {
  const eventBus = getEventBus();
  if (eventBus && inputMessage.value) {
    eventBus.emit('sub:message', {
      content: inputMessage.value,
      timestamp: Date.now(),
      from: 'vue3-sub-app',
    });
    inputMessage.value = ''; // 清空输入
  }
};

// 生命周期钩子
onMounted(() => {
  const eventBus = getEventBus();
  if (eventBus) {
    eventBus.on('main:message', handleMainMessage);
  }
});

onBeforeUnmount(() => {
  const eventBus = getEventBus();
  if (eventBus) {
    eventBus.off('main:message', handleMainMessage);
  }
});
</script>

<style scoped>
.message-component {
  padding: 20px;
}

.received-message {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.message-sender {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #40a9ff;
}
</style>
```

## 4. 在路由组件中使用

```typescript
// src/router/index.ts
import { RouteRecordRaw } from 'vue-router';
import { getEventBus } from '../utils/eventBus';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: (to, from, next) => {
      // 通知主应用路由变化
      const eventBus = getEventBus();
      if (eventBus) {
        eventBus.emit('sub:route-change', {
          to: to.path,
          from: from.path,
          timestamp: Date.now(),
        });
      }
      next();
    },
  },
];

export default routes;
```

## 5. 在 Vuex/Pinia 中使用

### 5.1 Vuex Store 示例

```typescript
// src/store/index.ts
import { createStore } from 'vuex';
import { getEventBus } from '../utils/eventBus';

export default createStore({
  state: {
    mainAppData: null,
  },
  mutations: {
    SET_MAIN_APP_DATA(state, data) {
      state.mainAppData = data;
    },
  },
  actions: {
    // 发送数据到主应用
    sendDataToMain({ commit }, data) {
      const eventBus = getEventBus();
      if (eventBus) {
        eventBus.emit('sub:state-change', {
          data,
          timestamp: Date.now(),
        });
      }
    },
    // 初始化事件监听
    initEventListeners({ commit }) {
      const eventBus = getEventBus();
      if (eventBus) {
        eventBus.on('main:state-change', data => {
          commit('SET_MAIN_APP_DATA', data);
        });
      }
    },
  },
});
```

### 5.2 Pinia Store 示例

```typescript
// src/stores/mainAppStore.ts
import { defineStore } from 'pinia';
import { getEventBus } from '../utils/eventBus';

export const useMainAppStore = defineStore('mainApp', {
  state: () => ({
    mainAppData: null,
  }),
  actions: {
    // 发送数据到主应用
    sendDataToMain(data: any) {
      const eventBus = getEventBus();
      if (eventBus) {
        eventBus.emit('sub:state-change', {
          data,
          timestamp: Date.now(),
        });
      }
    },
    // 初始化事件监听
    initEventListeners() {
      const eventBus = getEventBus();
      if (eventBus) {
        eventBus.on('main:state-change', data => {
          this.mainAppData = data;
        });
      }
    },
    // 清理事件监听
    clearEventListeners() {
      const eventBus = getEventBus();
      if (eventBus) {
        eventBus.off('main:state-change');
      }
    },
  },
});
```

## 6. 最佳实践

1. 事件命名规范：

   - 主应用发送的事件以 'main:' 开头
   - 子应用发送的事件以 'sub:' 开头
   - 使用具体的动作描述，如 'message'、'state-change'、'route-change' 等

2. 数据格式规范：

   ```typescript
   interface EventData {
     content?: string; // 消息内容
     data?: any; // 传输的数据
     timestamp: number; // 时间戳
     from: string; // 来源标识
     type?: string; // 消息类型
   }
   ```

3. 错误处理：

   ```typescript
   function safeEmit(event: string, data: any) {
     const eventBus = getEventBus();
     if (!eventBus) {
       console.warn('[子应用] 事件总线未初始化');
       return;
     }
     try {
       eventBus.emit(event, {
         ...data,
         timestamp: Date.now(),
         from: 'vue3-sub-app',
       });
     } catch (error) {
       console.error('[子应用] 事件发送失败:', error);
     }
   }
   ```

4. 生命周期管理：

   - 在应用挂载时初始化事件监听
   - 在组件卸载时清理相关的事件监听
   - 在应用卸载时清理所有事件监听

5. 类型定义：

   ```typescript
   // src/types/eventBus.ts
   export interface EventBus {
     on(event: string, callback: (...args: any[]) => void): void;
     off(event: string, callback: (...args: any[]) => void): void;
     emit(event: string, ...args: any[]): void;
   }

   export interface EventData {
     content?: string;
     data?: any;
     timestamp: number;
     from: string;
     type?: string;
   }
   ```

## 7. 调试技巧

1. 添加调试日志：

   ```typescript
   const DEBUG = process.env.NODE_ENV === 'development';

   function debugLog(type: string, ...args: any[]) {
     if (DEBUG) {
       console.log(`[子应用][${type}]`, ...args);
     }
   }

   // 使用示例
   eventBus.on('main:message', data => {
     debugLog('收到主应用消息', data);
     // 处理消息...
   });
   ```

2. 开发环境事件监控：
   ```typescript
   if (process.env.NODE_ENV === 'development') {
     const eventBus = getEventBus();
     if (eventBus) {
       const originalEmit = eventBus.emit;
       eventBus.emit = function (...args: any[]) {
         console.log('[子应用] 发送事件:', args);
         return originalEmit.apply(this, args);
       };
     }
   }
   ```
