import React, { Component } from 'react';

// class경우 -> constructor -> render -> ref -> conponetDidMount
// -> (setState/props 바뀔 때 -> shouldCompnentUpadate(true) -> render -> conponetDidUpdate)
// 부모가 나를 없앴을 때 -> componetWillUnmount -> 소멸

class RSP extends Component {
  state = {
    result: '',
    imgCoord: 0,
    score: 0,
  }

  render() {
    const { result, imgCoord, score } = this.state;
    return (
      <>
        <div id='computer' style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
        <div>
          <button id='rock' className='btn' onClick={() => onClickBtn('바위')} >바위</button>
          <button id='scissor' className='btn' onClick={() => onClickBtn('가위')} >가위</button>
          <button id='paper' className='btn' onClick={() => onClickBtn('보')} >보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }
}

export default RSP;