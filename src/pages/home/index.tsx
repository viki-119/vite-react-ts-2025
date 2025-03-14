import { Button } from 'antd';
import viteLogo from '/vite.svg';

import useCountDown from '../../components/useCountDown';
import reactLogo from '../../assets/react.svg';
// useState, useEffect, useRef, use, Children

const Home: React.FC = () => {
  const { count, start, pause, reset } = useCountDown({ count: 10 });
  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>{count}</div>
      <div className="btn-operate">
        <Button onClick={start}>开始</Button>
        <Button onClick={pause}>暂停</Button>
        <Button onClick={reset}>重置</Button>
      </div>
      {new Array(100).fill(100).map((_, key) => {
        return <div key={key}>{key}</div>;
      })}
    </div>
  );
};
export default Home;
