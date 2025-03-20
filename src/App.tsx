import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Routes from './routes';
import styles from './App.module.scss';
import { MicroAppListener } from './components/MicroAppListener';
import { Button, Input, message, Space } from 'antd';
import { globalStateManager, microAppEventBus } from './common/micro-app-communication';

const App: React.FC = () => {
  // const [state, setState] = useState<string>(() => {
  //   return '123'
  // });

  const [messageText, setMessageText] = useState('');

  // 更新全局状态
  const updateGlobalState = () => {
    const rootDom = document.getElementById('app');
    console.log(
      '%c 🌽rootDom🌽:',
      'color: LightPink; background: DarkOrange; font-size: 20px;',
      rootDom
    );
    globalStateManager.setGlobalState({
      message: messageText,
      timestamp: Date.now(),
      from: 'main-app',
    });
    message.success('已发送全局状态更新');
  };

  // 发送事件到子应用
  const sendEventToSubApp = () => {
    microAppEventBus.emit('main:message', {
      content: messageText,
      timestamp: Date.now(),
      from: 'main-app',
    });
    message.success('已发送事件到子应用');
  };

  // 更新主题
  const updateTheme = (theme: 'light' | 'dark') => {
    globalStateManager.setGlobalState({ theme });
    message.success(`已切换到${theme === 'light' ? '浅色' : '深色'}主题`);
  };

  // 发送用户信息
  const sendUserInfo = () => {
    globalStateManager.setGlobalState({
      user: {
        id: '001',
        name: 'Admin',
        role: 'administrator',
        lastUpdate: Date.now(),
      },
    });
    message.success('已更新用户信息');
  };
  return (
    <>
      <MicroAppListener />
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">主应用首页</Link>
          </li>
          <li>
            <Link to="/about/123?age=22">关于</Link>
          </li>
          <li>
            <Link to="/vite-vue3-ts-2025">Vue3子应用</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.communicationPanel}>
        <h3>乾坤通信测试面板</h3>
        <Space direction="vertical" style={{ width: '100%', marginBottom: '20px' }}>
          <Input.TextArea
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            placeholder="输入要发送的消息"
            rows={4}
          />
          <Space>
            <Button type="primary" onClick={updateGlobalState}>
              更新全局状态
            </Button>
            <Button onClick={sendEventToSubApp}>发送事件到子应用</Button>
          </Space>
          <Space>
            <Button onClick={() => updateTheme('light')}>切换浅色主题</Button>
            <Button onClick={() => updateTheme('dark')}>切换深色主题</Button>
            <Button onClick={sendUserInfo}>更新用户信息</Button>
          </Space>
        </Space>
      </div>
      <div className={styles.content}>
        <Routes />
      </div>
    </>
  );
};

export default App;
