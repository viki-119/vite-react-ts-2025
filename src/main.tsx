import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerMicroApps, start } from 'qiankun';
import '@ant-design/v5-patch-for-react-19';

import './index.css';
import App from './App.tsx';
import { microApps, microAppLifeCycles } from './micro-app-config';

// 注册微应用
registerMicroApps(microApps, microAppLifeCycles);
// 启动 qiankun
start();

// 渲染主应用
const renderApp = (): void => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

renderApp();
