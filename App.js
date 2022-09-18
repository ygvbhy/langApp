import React, {useRef} from 'react';
import styled from "styled-components/native";
import {Animated, Dimensions} from "react-native";

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

const Touch = styled.Pressable``

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// https://reactnative.dev/docs/0.66/animated
// 애니메이션에 대한 자세한 내용 정리
// 버전에 맞게 확인 하면 됨
export default function App() {
  // 위치를 바꾼 이유 : 애니메이션은 정상 작동 하는데 가운데가 디폴트라 끊기면서 중앙으로 갔다가 다시 시작됨
  const POSITION = useRef(new Animated.ValueXY({x: -SCREEN_WIDTH / 2 + 100, y: -SCREEN_HEIGHT / 2 + 100})).current
  // 모양이 나오는 위치 값 정의 변수의 이름대로 왼상 우상 왼하 우하
  const topLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100
    },
    useNativeDriver: false,
  })
  const bottomLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100
    },
    useNativeDriver: false,
  })
  const topRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100
    },
    useNativeDriver: false,
  })
  const bottomRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100
    },
    useNativeDriver: false,
  })
  const moveUp = () => {
    // 무한 반복
    Animated.loop(
        // 애니메이션이 시작 되면 선언 한 순서대로 진행 됨
        Animated.sequence([
          bottomLeft, bottomRight, topRight, topLeft
        ])
    ).start()
  }

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: [100, 0]
  })

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
          transform: [
              // 아래의 함수를 사용 하면 transform 에 대한 값들이 나오게 설정 되어 있음
              // js 문법 사용 해서 ... 함수 해두면 값들이 선언됨
              ...POSITION.getTranslateTransform(),
          ]
        }}
      />
    </Touch>
  </Container>;
}


