import React, { Component } from 'react';

// class경우 -> constructor -> render -> ref -> conponetDidMount
// -> (setState/props 바뀔 때 -> shouldCompnentUpadate(true) -> render -> conponetDidUpdate)
// 부모가 나를 없앴을 때 -> componetWillUnmount -> 소멸


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

class RSP extends Component {
  state = {
    result: '',
    imgCoord: '0',
    score: 0,
  }

  interval;
  timeout;
  clickable = true;

  componentDidMount() { // 컴포넌트가 첫 렌더링 후, 여기에 비동기 요청을 많이 함
    console.log('here')
    this.interval = setInterval(this.changeHand, 100)
  }

  // componentDidUpdate() { 리렌더링 후
  // }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함
    clearInterval(this.interval)
  }

  changeHand = () => {
    // console.log('here')
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.rock) {
      this.setState({
        imgCoord: rspCoords.scissor,
      })  
    } else if (imgCoord === rspCoords.scissor) {
      this.setState({
        imgCoord: rspCoords.paper,
      })
    } else if (imgCoord === rspCoords.paper) {
      this.setState({
        imgCoord: rspCoords.rock,
      })
    }
  }

  onClickBtn = (choice) => {
    const { imgCoord } = this.state;
    if(this.clickable) {
      clearInterval(this.interval);
      this.clickable = false;
      const myScore = scores[choice];
      const computerScore = scores[computerChoice(imgCoord)];
      const diff = myScore - computerScore;
      if (diff === 0) {
        this.setState({
          result: '비겼습니다',
        })
      } else if ([-1, 2].includes(diff)) {
        this.setState((prevState) => {
          return {
            result: '이겼습니다',
            score: prevState.score + 1,
          }
        })
      } else {
        this.setState((prevState) => {
          return {
            result: '졌습니다',
            score: prevState.score - 1,
          }
        })
      }
      this.timeout = setTimeout(() => {
        this.clickable = true;
        this.interval = setInterval(this.changeHand, 100)
      }, 2000)
    }
  }

  render() {
    const { result, imgCoord, score } = this.state;
    return (
      <>
        <div id='computer' style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
        <div>
          <button id='rock' className='btn' onClick={() => this.onClickBtn('rock')} >바위</button>
          <button id='scissor' className='btn' onClick={() => this.onClickBtn('scissor')} >가위</button>
          <button id='paper' className='btn' onClick={() => this.onClickBtn('paper')} >보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }
}

export default RSP;