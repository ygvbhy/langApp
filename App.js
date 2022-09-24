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

// https://reactnative.dev/docs/0.66/panresponder
// 터치로 드래그하는 것에 대한 자세한 내용 정리
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

  const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
          // 움직이고 보면 이전 위치에서 멈춤
          // 그러나 다시 움직이면 위치가 초기화 됨
          // 이게 맞는거임 버그는 아님
          //  이전의 위치를 기억하는 offset
        onPanResponderGrant: () => {
            console.log("터치 시작")
            POSITION.setOffset({
                // x: POSITION.x,
                // 숫자값이 아니므로 오류가 발생함
                // 숫자값으로 할려면 ._value 를 추가해주면 됨 - 문서에 적혀있진 않음
                x: POSITION.x._value,
                y: POSITION.y._value
            })
        },
        onPanResponderMove: (_, {dx, dy}) => {
            console.log("터치 중")
          POSITION.setValue({
            x: dx,
            y: dy
          })
        },

        onPanResponderRelease: () => {
            console.log("터치 종료")
            // 계속 움직이다 보면 미쳐 돌아가서 누른 위치보다 높거나 낮게 위치하여 움직임
            // 이때 누를떄와 마찬가지로 값을 계속 더해줘서 그런 이슈가 생김
            POSITION.flattenOffset()
            // 위치를 초기화 해줌
        }
      })
  ).current;

  return (
    <Container>
        <AnimatedBox
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


