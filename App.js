import React from 'react';
import styled from "styled-components/native";
import {Animated} from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
// TouchableOpacity 는 애니메이션이 잘 안먹음
// View 에 관련 된건 다 잘 먹기 때문에 그걸로 바꿔줌
// 근데 View 는 onPress 를 잃기 때문에 밖에 다시 감싸줘야함
const TimingBox = styled.View`
  background-color: tomato;
  width: 100px;
  height: 100px;
`
const AnimatedBox = Animated.createAnimatedComponent(TimingBox);

// 두가지의 예시가 나오므로 따로 해서 만들어 봄
const SpringBox = styled.View`
  background-color: blue;
  width: 100px;
  height: 100px;
`
const AnimatedSpringBox = Animated.createAnimatedComponent(SpringBox)

// 선언하기 싫어서 따로 만듬
const Touch = styled.TouchableOpacity``

export default function App() {
  const Y = new Animated.Value(0)
  const X = new Animated.Value(0)
  // Animated.Value 를 수정하는 방법은 3가지
  // https://reactnative.dev/docs/0.66/animated 자세한 내용
  // 가장 자주 사용하는건 timing() 임
  const moveUp = () => {
    Animated.timing(Y, {
      // Y 로 지정된 부분부터 어디까지 가는지에 대한 선언
      toValue: 200,
      // 항상 true 로 둠
      // 애니메이션에 대한 모든것을 native 쪽으로 보냄. 애니메이션이 시작 전에
      useNativeDriver: true
    }).start()
    // 시작을 해줘야 애니메이션이 실행됨
    // start 안에 또 지정이 가능
  }

  const moveDown = () => {
    // 통통 튀는 효과
    Animated.spring(X, {
      toValue: -100,
      // 얼마나 튈지 설정
      // bounciness: 15,
      // bounciness 와 speed 를 같이 쓸 수 있음

      friction: 10,
      tension: 800, // 탄성 ? 느낌 높을 수록 많이 튐 ㅋㅋ 느낌이 선언 한 숫자 만큼 튕구고 멈추는 듯 함
      // tension 과 frictions 을 같이 쓸 수 있음
      useNativeDriver: true
    }).start()
  }
  // 여기서 Y 가 바뀌는걸 보면 딱 한번 만 나옴 처음 렌더 할때만
  console.log(Y)
  // Y 가 바뀌는걸 보고 싶으면 이벤트를 줘야 함
  Y.addListener(() => console.log(Y))
  // 이렇게 하면 Y 의 변하는 과정이 나옴

  return <Container>
    <Touch onPress={moveUp}>
      <AnimatedBox
        style={{
          transform: [{translateY: Y}]
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


