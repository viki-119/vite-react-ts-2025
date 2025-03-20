import { FC, useEffect } from 'react';
import { microAppEventBus } from '../common/micro-app-communication';

export const MicroAppListener: FC = () => {
  useEffect(() => {
    // 监听子应用发送的普通消息
    const handleMessage = (data: any): void => {
      console.log('[主应用] 收到子应用消息:', data);
      // 这里可以添加处理消息的逻辑
    };

    // 监听子应用发送的用户操作事件
    const handleUserAction = (action: string, data: any): void => {
      console.log('[主应用] 收到子应用用户操作:', action, data);
      // 这里可以添加处理用户操作的逻辑
    };

    // 监听子应用发送的错误信息
    const handleError = (error: Error) => {
      console.error('[主应用] 收到子应用错误:', error);
      // 这里可以添加错误处理逻辑
    };

    // 注册事件监听器
    microAppEventBus.on('subapp:message', handleMessage);
    microAppEventBus.on('subapp:userAction', handleUserAction);
    microAppEventBus.on('subapp:error', handleError);

    // 组件卸载时清理事件监听器
    return (): void => {
      microAppEventBus.off('subapp:message', handleMessage);
      microAppEventBus.off('subapp:userAction', handleUserAction);
      microAppEventBus.off('subapp:error', handleError);
    };
  }, []);

  return null; // 这是一个纯逻辑组件，不需要渲染任何内容
};
