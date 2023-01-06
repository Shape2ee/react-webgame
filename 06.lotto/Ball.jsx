import React, { memo } from 'react';
import styled from 'styled-components';

const StyledBall = styled.div`
  display: inline-block;
  margin-right: 20px;
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 20px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
`

const Ball = memo(({ numbers }) => {
  let background;
  if (numbers <= 10) {
    background = 'red';
  } else if (numbers <= 20) {
    background = 'orange';
  } else if (numbers <= 30) {
    background = 'yellow';
  } else if (numbers <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }

  return(
    <StyledBall style={{ background }}>{numbers}</StyledBall>
  )
});

export default Ball;
