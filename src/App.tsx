import { useState, useEffect, useRef, use, Children } from 'react'
import { Button } from 'antd';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useCountDown from './components/useCountDown'


function App() {
  const [state, setState] = useState<string>(() => {
    return '123'
  });
  const {count, start, pause, reset} = useCountDown({count: 10})
  
  useEffect(() => {
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>{count}</div>
      <div className='btn-operate'>
        <Button onClick={start}>开始</Button>
        <Button onClick={pause}>暂停</Button>
        <Button onClick={reset}>重置</Button>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
