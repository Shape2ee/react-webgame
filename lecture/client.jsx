const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./WordRelay'); // WordRelay 불러오기

ReactDom.render(<WordRelay />, document.querySelector('#root'));