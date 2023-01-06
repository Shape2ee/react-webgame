import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers')
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p,c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,
  }

  timeOuts = [];

  componentDidMount() {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      
      this.timeOuts[i] = setTimeout(() => {
        console.log(winNumbers[i], 'here')
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]] 
          };
        });
      }, (i + 1) * 1000);
    }

    this.timeOuts[6] = setTimeout(() => {
      console.log('here')
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      })
    }, 7000)
  }

  componentWillUnmount() {
    this.timeOuts.forEach((v) => {
      clearTimeout(v)
    })
  }

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨숫자</div>
        <div id='결과창'>
          {winBalls.map((v) => <Ball key={v} numbers={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball numbers={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    )
  }
}

export default Lotto;