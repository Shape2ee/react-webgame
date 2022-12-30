import React, { useState, useRef } from 'react';
// 파일을 분리해줄때 위에 두줄을 적어줘야 한다.

const ResponseCheck = () => {
  const [ state, setState ] = useState('waiting');
  const [ message, setMessage ] = useState('클릭해서 시작하세요.')
  const [ result, setResult ] = useState([])
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onChangeScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      
      timeOut.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(timeOut.current);
      setState('waiting');
      setMessage('너무 성급하셨네요. 초록색이 되면 클릭하세요.');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
    }
  }
  const onReset = () => {
    setResult([]);
  }

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
  }
  return (
    <>
      <div id="screen" className={state} onClick={onChangeScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  )
}

export default ResponseCheck;