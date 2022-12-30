const React = require('react');
const ReactDom = require('react-dom');

const ResponseCheck = require('./ResponseCheck'); // WordRelay 불러오기

ReactDom.render(<ResponseCheck />, document.querySelector('#root'));