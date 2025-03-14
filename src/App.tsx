import React from 'react';
import { Link } from 'react-router-dom';

import Routes from './routes';
import './App.css';

const App: React.FC = () => {
  // const [state, setState] = useState<string>(() => {
  //   return '123'
  // });

  return (
    <>
      <nav>
        <ul style={{ display: 'flex', gap: '20px' }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/123?age=22">About</Link>
          </li>
        </ul>
      </nav>
      <Routes />
    </>
  );
};

export default App;
