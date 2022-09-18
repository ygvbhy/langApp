import React, {useEffect, useState} from 'react';
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Box = styled.TouchableOpacity`
  background-color: tomato;
  width: 200px;
  height: 200px;
`

export default function App() {
  const [y, setY] = useState(0);
  const [intervalId, setIntervalId] = useState(null)
  const moveUp = () => {
    // 말이 애니메이션이지만 아님.
    // 0.01초마다 반복시켜 y축의 값만 바꿔준 아주 안좋은 애니메이션
    // 0.01초마다 렌더를 시키기 때문에 만약 이렇게 할거면 그냥 때려 치는게 맞다
    const id = setInterval(() => setY(prev => prev + 1), 10)
    setIntervalId(id)
  }
  useEffect(() => {
    if(y === 200) {
      clearInterval(intervalId)
    }
  }, [y, intervalId])
  return <Container>
    <Box onPress={moveUp} style={{
      transform: [{translateY: y}]
    }} />
  </Container>;
}


