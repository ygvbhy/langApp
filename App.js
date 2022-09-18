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
        onPanResponderMove: (_, {dx, dy}) => {
          POSITION.setValue({
            x: dx,
            y: dy
          })
        },
          // 사용자가 터치가 끝났을때 반응 하는 함수
        onPanResponderRelease: () => {
            // 터치가 끝났다고 판단 되면 원래 위치로 돌아오게 함
            // 그냥 오면 멋없으니 튕기는 애니메이션 넣어서 오게 함
            Animated.spring(POSITION,{
                toValue: {
                    x: 0,
                    y: 0
                },
                bounciness: 20,
                useNativeDriver: false,
            }).start()
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


