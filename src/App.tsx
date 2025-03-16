import React from 'react';
import { Link } from 'react-router-dom';

import Routes from './routes';
import styles from './App.module.scss';

const App: React.FC = () => {
  // const [state, setState] = useState<string>(() => {
  //   return '123'
  // });
  return (
    <>
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
      <div className={styles.content}>
        <Routes />
      </div>
    </>
  );
};

export default App;
