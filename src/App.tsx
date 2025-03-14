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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/123?age=22">About</Link>
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
