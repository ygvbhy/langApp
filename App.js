import React, {useRef, useState} from 'react';
import styled from "styled-components/native";
import {Animated, Easing} from "react-native";

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
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const Y = useRef(new Animated.Value(0)).current
  // 지금 까지의 코드는 한방향으로만 움직였으므로 잘못된 코드라 볼 수 있음
  // +200 의 위치에 갔다가 다시 클릭 하면 -200 의 위치로 돌아오는걸 해볼 거임
  // useRef 는 다시 렌더링이 일어나더라도 value 를 유지해주는 훅임
  // 애니메이션이 진행 되고 값이 초기화 되어 0으로 돌아가는데 유지 되어 200 으로 됨
  // 그리고 다시 누르면 setUp 코드의 효과로 -200 의 자리로 감
  const toggleUp = () => setUp((prev) => !prev)
  const X = useRef(new Animated.Value(0)).current;
  const toggleDown = () => setDown((prev) => !prev)
  // Animated.Value 를 수정하는 방법은 3가지
  // https://reactnative.dev/docs/0.66/animated 자세한 내용
  // 가장 자주 사용하는건 timing() 임
  const moveUp = () => {
    Animated.timing(Y, {
      // Y 로 지정된 부분부터 어디까지 가는지에 대한 선언
      toValue: up ? 200 : -200,
      // 항상 true 로 둠
      // 애니메이션에 대한 모든것을 native 쪽으로 보냄. 애니메이션이 시작 전에
      useNativeDriver: true,
      // timing 을 쓰는 이유
      // 이러한 효과들이 많이 있음 테스트 해보고 골라서 쓰면 됨
      easing: Easing.bounce
    }).start(toggleUp)
    // 시작을 해줘야 애니메이션이 실행됨
    // start 안에 또 지정이 가능
  }

  const moveDown = () => {
    // 통통 튀는 효과
    Animated.spring(X, {
      // spring 은 튀는 효과가 끝나고 눌러야 효과가 적용 됨
      toValue: down ? 100 : -100,
      // 얼마나 튈지 설정
      // bounciness: 15,
      // bounciness 와 speed 를 같이 쓸 수 있음

      friction: 10,
      tension: 800, // 탄성 ? 느낌 높을 수록 많이 튐 ㅋㅋ 느낌이 선언 한 숫자 만큼 튕구고 멈추는 듯 함
      // tension 과 frictions 을 같이 쓸 수 있음
      useNativeDriver: true
    }).start(toggleDown)
    // 시작하면서 함수를 실행 해줌
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


