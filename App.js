import React, {useRef} from 'react';
import styled from "styled-components/native";
import {
  Animated,
  Dimensions,
  PanResponder
} from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const TimingBox = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`
const AnimatedBox = Animated.createAnimatedComponent(TimingBox);

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// https://reactnative.dev/docs/0.66/animated
// 애니메이션에 대한 자세한 내용 정리
// 버전에 맞게 확인 하면 됨
export default function App() {
  const POSITION = useRef(
      new Animated.ValueXY(
          {
            x: 0,
            y: 0
          })
  ).current

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: [100, 0]
  })

  const bgColor = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"]
  })

  // 터치로 드래그 할 수 있는 함수 생성
  // 웹에선 마우스로 드래그 기능
  const panResponder = useRef(
      PanResponder.create({
        // 어떠한 터치도 사용하겠다는 선언
        onStartShouldSetPanResponder: () => true,
        // 몇개의 손가락으로 터치 했는지 터치한 위치가 어딘지 까지 값이 나옴 dx, dy
        onPanResponderMove: (_, {dx, dy}) => {
            // 해당 view 의 위치를 재설정 해주는 명령
          POSITION.setValue({
            x: dx,
            y: dy
          })
        }
      })
  ).current;

  return (
    <Container>
        <AnimatedBox
          /*  펜 핸들러를 사용하기 위해 선언 */
          {...panResponder.panHandlers}
          style={{
            borderRadius,
            backgroundColor: bgColor,
            transform: [
                ...POSITION.getTranslateTransform(),
            ]
          }}
        />
    </Container>
  )
}


