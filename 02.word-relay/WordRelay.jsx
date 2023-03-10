const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const [ word , setWord ] = useState('제로초');
  const [ value, setValue ] = useState('');
  const [ result, setResult ] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(value.length < 2) {
      setResult('2글자 이상의 단어를 입력해주세요')
      setValue('');
      return;
    }

    if(word[word.length - 1] === value[0]) {
      setResult('정답!');
      setWord(value);
      setValue('');
    } else {
      setResult('땡!');
      setValue('');
    }
    inputRef.current.focus();
  }

  const onChangeInput = (e) => {  
    setValue(e.target.value);
  }

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} value={value} onChange={onChangeInput}/>
        <button>입력!!</button>
      </form>
      <div>{result}</div>
    </>
  )
}


module.exports = WordRelay;