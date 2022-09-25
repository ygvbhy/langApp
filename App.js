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
    const onPressIn = () =>
        Animated.spring(scale, {toValue: 0.95, useNativeDriver: true}).start()
    const onPressOut = () =>
        Animated.spring(scale, {toValue: 1, useNativeDriver: true}).start()
    const position = useRef(new Animated.Value(0)).current
    const rotation = position.interpolate({
        inputRange: [-250, 250],
        outputRange: ["-15deg", "15deg"],
        // 위에 설정한 값을 넘어 갈 때 행동할것을 정해줌
        extrapolate: 'clamp'
    })

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => onPressIn(),
        onPanResponderRelease: (_, {dx}) => {
            // dx 의 위치 값에 따라 할것을 정해줌
            if( dx < -320){
                Animated.spring(position, {toValue: -400, useNativeDriver: true}).start()
            } else if (dx > 320) {
                Animated.spring(position, {toValue: 400, useNativeDriver: true}).start()
            } else {
                Animated.spring(position, {toValue : 0, useNativeDriver: true}).start()
            }
            onPressOut()
        },
        onPanResponderMove: (_, {dx}) => {
            position.setValue(dx)
        },
    })).current;

    return (
        <Container>
            <Card
                {...panResponder.panHandlers}
                style={{
                transform: [{scale}, {translateX: position}, {rotateZ: rotation}]
                }}
            >
                <Ionicons name="pizza" color="#192a56" size={98} />
            </Card>
        </Container>
    )
}


