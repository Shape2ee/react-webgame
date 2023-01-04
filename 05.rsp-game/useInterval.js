import { useRef, useEffect } from 'react';

// useInterval(() => {
//   console.log('hello');
// }, isRunning ? 1000 : null);


function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
      savedCallback.current = callback;
  })

  useEffect(() => {
    function tric() {
      savedCallback.current();
    }

    if(delay !== null) {
      let id = setInterval(tric, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return savedCallback.current;
}

export default useInterval;