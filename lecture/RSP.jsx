import React, { Component } from 'react';

// class경우 -> constructor -> render -> ref -> conponetDidMount
// -> (setState/props 바뀔 때 -> shouldCompnentUpadate(true) -> render -> conponetDidUpdate)
// 부모가 나를 없앴을 때 -> componetWillUnmount -> 소멸


const rspCoords = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px',
}

const score = {
  rock: 0,
  scissors: 1,
  paper: -1,
}

class RSP extends Component {
  state = {
    result: '',
    imgCoord: '0',
    score: 0,
  }

  interval;

  componentDidMount() { // 컴포넌트가 첫 렌더링 후, 여기에 비동기 요청을 많이 함
    this.interval = setInterval(() => {
      const { imgCoord } = this.state;
      if (imgCoord === rspCoords.rock) {
        this.setState({
          imgCoord: rspCoords.scissors
        })  
      } else if (imgCoord === rspCoords.scissors) {
        this.setState({
          imgCoord: rspCoords.paper
        })
      } else if (imgCoord === rspCoords.paper) {
        this.setState({
          imgCoord: rspCoords.rock
        })
      }
    }, 1000)
  }

  componentDidUpdate() { // 리렌더링 후

  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함

  }

  onClick = () => {

  }

  render() {
    const { result, imgCoord, score } = this.state;
    return (
      <>
        <div id='computer' style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
        <div>
          <button id='rock' className='btn' onClick={() => this.onClickBtn('바위')} >바위</button>
          <button id='scissor' className='btn' onClick={() => this.onClickBtn('가위')} >가위</button>
          <button id='paper' className='btn' onClick={() => this.onClickBtn('보')} >보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }
}

export default RSP;