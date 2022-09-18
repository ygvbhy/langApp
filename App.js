import React, {useRef, useState} from 'react';
import styled from "styled-components/native";
import {Animated} from "react-native";

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

const Touch = styled.Pressable``

// https://reactnative.dev/docs/0.66/animated
// 애니메이션에 대한 자세한 내용 정리
// 버전에 맞게 확인 하면 됨
export default function App() {
  const [up, setUp] = useState(false);
  // 한가지의 Value 로 설정 해서 X 인지 Y 인지 설정이 가능했음
  // valueXY 로 설정 하고 {x: ~, y: ~} 로 X, Y 의 값을 따로 지정이 가능 함
  // 이에 따라 변수의 이름이 변경 되고 해당 값이 사용 될떄는 POSITION.x or POSITION.y 로 사용
  const POSITION = useRef(new Animated.ValueXY({x: 0, y: 250})).current
  const toggleUp = () => setUp((prev) => !prev)
  const moveUp = () => {
    Animated.timing(POSITION, {
      toValue: up ? 250 : -250,
      useNativeDriver: false,
      duration: 1000,
    }).start(toggleUp)
  }

  // String 값으로 선언 하더라고 앞의 숫자는 범위 내에서 변함
  const rotation = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-360deg", "360deg"],
  })

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: [50, 0]
  })

  // useNativeDriver: true 의 선택 값으로 인해 배경 색상은 바꿀 수 없으므로
  // useNativeDriver: false 로 바꿔주고 진행 해야 배경색이 바뀜
  const bgColor = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"]
  })

  return <Container>
    <Touch onPress={moveUp}>
      <AnimatedBox
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: [{rotateY: rotation}, {translateY: POSITION.y}]
        }}
      />
    </Touch>
  </Container>;
}


