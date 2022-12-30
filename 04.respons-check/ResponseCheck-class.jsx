import React, { Component } from 'react';
// 파일을 분리해줄때 위에 두줄을 적어줘야 한다.

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  }

  timeout;
  startTime;
  endTime;

  onChangeScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.',
      })
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        })
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하셨어요. 초록색이 되면 클릭하세요.'
      });
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime - this.startTime],
        }
      });
    }
  }

  onReset = () => {
    this.setState({
      result: [],
    })
  }

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
  }

  render() {
    const { state, message, result } = this.state
    return(
      <>
        <div id="screen" className={state} onClick={this.onChangeScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    )
  }
};

export default ResponseCheck;