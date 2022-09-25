import React, {useRef} from 'react';
import styled from "styled-components/native";
import {
    Animated,
    PanResponder,
    View
} from "react-native";
import {Ionicons} from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0,0,0, .2);
`

export default function App() {
    const scale = useRef(new Animated.Value(1)).current;
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        // 애니메이션 시작
        onPanResponderGrant: () => onPressIn(),
        // 애니메이션 종료시 줄엇던 크기를 늘려주면서 위치 초기화 0 번 자리에
        onPanResponderRelease: () => {
            onPressOut()
            Animated.spring(position, {toValue : 0, useNativeDriver: true}).start()
        },
        // 애니메이션이 움직일때 x 값만 바꿔줌
        onPanResponderMove: (_, {dx}) => {
            position.setValue(dx)
        },
    })).current;
    // 눌렀을떄 반응할 애니메이션
    const onPressIn = () =>
        Animated.spring(scale, {toValue: 0.95, useNativeDriver: true}).start()
    // 터치가 끝났을때 반응 할 애니메이션
    const onPressOut = () =>
        Animated.spring(scale, {toValue: 1, useNativeDriver: true}).start()
    // 초기 위치
    const position = useRef(new Animated.Value(0)).current

    return (
        <Container>
            <Card
                {...panResponder.panHandlers}
                style={{
                transform: [{scale}, {translateX: position}]
                }}
            >
                <Ionicons name="pizza" color="#192a56" size={98} />
            </Card>
        </Container>
    )
}


