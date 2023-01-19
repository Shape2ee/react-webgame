import React,{ useState } from 'react'

const Test = () => {
  const [count, setCount] = useState(0)

  const onClick = () => {
    setCount((prevCount) => prevCount + 1)
    // setCount(count+1)
  }
  return (
    <>
      <div>
        {count}
      </div>
      <button onClick={onClick}>+1</button>
    </>
  )
}

export default Test