const React = require("react");
const { Component } = React;
// 파일을 분리해줄때 위에 두줄을 적어줘야 한다.

class WordRelay extends Component {
  state = {
    text: 'hello, webpack',
  }
  render() {
    return(
      <h1>{this.state.text}</h1>
    )
  }
};

module.exports = WordRelay;
// 코드를 작성한 컴포넌트를 바깥에서도 사용할 수 있게 해주는 노드모듈 시스템