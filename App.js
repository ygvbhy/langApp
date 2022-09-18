import React from 'react';
import styled from "styled-components/native";
import {Animated} from "react-native";

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
const AnimatedBox = Animated.createAnimatedComponent(Box);

// 애니메이션과 styled 를 같이 사용 할 때 선언 하는 방법은 두가지
// 직접 한줄에 선언하는 방법
// const AnimatedBox = styled(Animated.createAnimatedComponent(TouchableOpacity))
// 위의 방법 처럼 하면 react-native 의 TouchableOpacity 를 같이 선언 해야 함
// 이 방법이 싫다면 밑의 방법
// const AnimatedBox = Animated.createAnimatedComponent(Box);
// 위의 방법은 react-native 의 TouchableOpacity 를 직접 선언 하지 않고 styled 의 선언된 부분을 애니메이션으로 사용이 가능

export default function App() {

  // 1. useState 를 사용하지 않음
  // 2. Y 의 Value 를 직접 정하지 않음
  // 3. 애니메이션의 규칙이 있음 View 를 직접 쓰지 않고 Animated.View 이렇게 선언 해야함

  const Y = new Animated.Value(0)
  const moveUp = () => {

  }
  return <Container>
    <AnimatedBox
      onPress={moveUp}
      style={{
        transform: [{translateY: Y}]
      }}
    />
  </Container>;
}


