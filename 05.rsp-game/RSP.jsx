import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {
  rock: '0',
  scissor: '-142px',
  paper: '-284px',
}

const scores = {
  rock: 0,
  scissor: 1,
  paper: -1,
}

const computerChoice = (imgCoord) => {
  console.log(imgCoord)
  return Object.entries(rspCoords).find((v) => {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [ result, setResult ] = useState('');
  const [ imgCoord, setImgCoord ] = useState('0');
  const [ score, setScore ] = useState(0);
  const [ clickable, setClickable ]  = useState(true);
  const interval = useRef(null);
  const timeout = useRef(null);

  useEffect(() => {
    interval.current = setInterval(changeHand, 100)
    return () => {
      clearInterval(interval.current);
    }
  }, [imgCoord])

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  }

  const onClickBtn = (choice) => () => {
    if(clickable) {
      clearInterval(interval.current);
      setClickable(false);
      console.log(clickable)
      const myScore = scores[choice];
      const computerScore = scores[computerChoice(imgCoord)];
      const diff = myScore - computerScore;
      if (diff === 0) {
        setResult('비겼습니다.');
      } else if ([-1, 2].includes(diff)) {
        setResult('이겼습니다.');
        setScore((prevScore) => prevScore + 1);
      } else {
        setResult('졌습니다.');
        setScore((prevScore) => prevScore - 1);
      }
      timeout.current = setTimeout(() => {
        setClickable(true)
        interval.current = setInterval(changeHand, 100)
      }, 2000)
    }
  }

  return (
    <>
      <div id='computer'
        style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}>
      </div>
      <div>
        {/* <button id='rock' className='btn' onClick={() => this.onClickBtn('rock')} >바위</button>
        <button id='scissor' className='btn' onClick={() => this.onClickBtn('scissor')} >가위</button>
        <button id='paper' className='btn' onClick={() => this.onClickBtn('paper')} >보</button> */}
        <button id='rock' className='btn' onClick={onClickBtn('rock')} >바위</button>
        <button id='scissor' className='btn' onClick={onClickBtn('scissor')} >가위</button>
        <button id='paper' className='btn' onClick={onClickBtn('paper')} >보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  )
}

export default RSP;