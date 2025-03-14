import React from 'react';
import { Button } from 'antd';
import viteLogo from '/vite.svg';
import reactLogo from '../../assets/react.svg';
import useCountDown from '../../components/useCountDown';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const { count, start, pause, reset } = useCountDown({ count: 10 });

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className={`${styles.logo} ${styles.react}`} alt="React logo" />
        </a>
      </div>
      <div className={styles.countDisplay}>{count}</div>
      <div className={styles.buttonGroup}>
        <Button onClick={start}>开始</Button>
        <Button onClick={pause}>暂停</Button>
        <Button onClick={reset}>重置</Button>
      </div>
      <div className={styles.numberList}>
        {new Array(100).fill(100).map((_, key) => (
          <div key={key} className={styles.numberItem}>
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
