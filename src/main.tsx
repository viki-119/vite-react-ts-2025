import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import '@ant-design/v5-patch-for-react-19';

import './index.css'
import App from './App.tsx'

// 添加一个可能触发新规则的函数
const renderApp = (): void => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
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
