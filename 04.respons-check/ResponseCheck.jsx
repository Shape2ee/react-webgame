const React = require("react");
const { Component } = React;
// 파일을 분리해줄때 위에 두줄을 적어줘야 한다.

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  }

  onChangeScreen = () => {

  }

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0
      ? null
      : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
  }

  render() {
    const { state, message } = this.state
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

module.exports = ResponseCheck;