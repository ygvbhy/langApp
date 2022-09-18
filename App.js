import React, {useRef, useState} from 'react';
import styled from "styled-components/native";
import {Animated, Easing} from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const TimingBox = styled.View`
  background-color: tomato;
  width: 100px;
  height: 100px;
`
const AnimatedBox = Animated.createAnimatedComponent(TimingBox);

const SpringBox = styled.View`
  background-color: blue;
  width: 100px;
  height: 100px;
`
const AnimatedSpringBox = Animated.createAnimatedComponent(SpringBox)

const Touch = styled.Pressable``

// https://reactnative.dev/docs/0.66/animated
// 애니메이션에 대한 자세한 내용 정리
// 버전에 맞게 확인 하면 됨
export default function App() {
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  // 구분을 위해 변수 명을 바꿔줌
  const Y_POSITION = useRef(new Animated.Value(250)).current

  const toggleUp = () => setUp((prev) => !prev)
  const X = useRef(new Animated.Value(0)).current;
  const toggleDown = () => setDown((prev) => !prev)
  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 250 : -250,
      useNativeDriver: true,
      duration: 1000,
    }).start(toggleUp)
  }
  const opacity = Y_POSITION.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: [1, .1, 1],
  })
  // Y 의 값이 -250 이면 1을 반환해 주세요. or Y 의 값이 0 이면 0 을 반환해 주세요
  // 와 같은 의미의 코드임
  // inputRange : Y 의 값이 들어오는 부분
  // outputRange : Y 의 값이 들어와서 설정한 값이 나오는 부분. 배열의 같은 위치의 값이 나옴
  // input 과 output 의 배열의 길이는 같아야 함

  Y_POSITION.addListener(() => console.log(opacity))
  // Y 값이 바뀔떄 마다 확인 해 보면
  // 1 줄어들었다가 늘어나는걸 확인 가능

  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-250, 250],
    outputRange: [50, 0]
  })


  const moveDown = () => {
    Animated.spring(X, {
      toValue: down ? 100 : -100,
      friction: 10,
      tension: 800,
      useNativeDriver: true
    }).start(toggleDown)
  }

  return <Container>
    <Touch onPress={moveUp}>
      <AnimatedBox
        style={{
          borderRadius,
          opacity,
          transform: [{translateY: Y_POSITION}]
        }}
      />
    </Touch>
    <Touch onPress={moveDown}>
      <AnimatedSpringBox
        style={{
          transform: [{translateX: X}]
        }}
      />
    </Touch>
  </Container>;
}


