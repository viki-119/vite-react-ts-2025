import { useRef, useState, useEffect, useCallback } from 'react';

const useCountDown = (props: {count: number}): {
  count: number;
  start: () => void;
  isRunning: boolean;
  pause: () => void;
  reset: () => void;
} => {
  const intervalRef = useRef<number>(null);
  const [count, setCount] = useState(props.count);
  const [isRunning, setIsRunning] = useState(false);

  const clearCountInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false); // 同步状态
    };
  }, [])

  const setCountData = useCallback(() => {
    setCount((preCount) => {
      if (preCount <=0) {
        clearCountInterval();
        return 0;
      }
      return preCount-1;
    })
  }, [clearCountInterval])

  const start = useCallback(() => {
    if(isRunning || count <= 0) return; 
    clearCountInterval();
    setIsRunning(true);
    intervalRef.current = setInterval(setCountData, 1000)
  }, [setCountData, isRunning, clearCountInterval, count])

  useEffect(() => {
    setCount(props.count);
    if (isRunning) {
      clearCountInterval();
      intervalRef.current = setInterval(setCountData, 1000);
    }
  }, [props.count, isRunning, clearCountInterval, setCountData])

  useEffect(() => {
    return (): void => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [])

  const pause = useCallback(() => {
    clearCountInterval();
  }, [clearCountInterval])

  const reset = useCallback(() => {
    pause()
    setCount(props.count);
  }, [props.count, pause])

  return { count, start, isRunning, pause, reset }
}

export default useCountDown; 