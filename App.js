import React, {useRef, useState} from 'react';
import styled from "styled-components/native";
import {
    Animated,
    PanResponder,
    View
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import icons from "./icons";

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
  position: absolute;
`
const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`
const Btn = styled.TouchableOpacity`
  margin: 0 10px;
`;
const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1
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
        extrapolate: 'clamp'
    })
    const secondScale = position.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: [1, .7, 1],
        extrapolate: 'clamp'
    })

    const goCenter = Animated.spring(position, {toValue : 0, useNativeDriver: true})
    const goLeft = Animated.spring(position, {toValue: -400, tension: 5, useNativeDriver: true, restSpeedThreshold: 100, restDisplacementThreshold: 100})
    // restSpeedThreshold 스프링이 정지된 것으로 간주되는 속도(초당 픽셀 수)입니다. 기본값은 0.001입니다.
    // restDisplacementThreshold 스프링이 정지 상태라고 간주해야 하는 정지 상태로부터의 변위 임계값. 기본값은 0.001입니다.
    // 이 두값을 적용 하지 않으면 스프링 애니메이션이 끝나는데에 약 3초 가량 소모 됨 그래서 첫장이 돌아오는데에 시간이 너무 오래 걸리므로
    // 헤당 값을 통해 빠르게 애니메이션을 끝내는 것임
    const goRight = Animated.spring(position, {toValue: 400, tension: 5, useNativeDriver:  true, restSpeedThreshold: 100, restDisplacementThreshold: 100})

    const [index, setIndex] = useState(0);
    const onDismiss = () => {
        scale.setValue(1);
        position.setValue(0)
        setIndex(prev => prev + 1)
    }

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => onPressIn(),
        onPanResponderRelease: (_, {dx}) => {
            if( dx < -250){
                goLeft.start(onDismiss)
            } else if (dx > 250) {
                goRight.start(onDismiss)
            } else {
                goCenter.start()
            }
            onPressOut()
        },
        onPanResponderMove: (_, {dx}) => {
            position.setValue(dx)
        },
    })).current;

    const closePress = () => {
        goLeft.start(onDismiss);
    }
    const checkPress = () => {
        goRight.start(onDismiss)
    }

    return (
        <Container>
            <CardContainer>
                <Card style={{
                    transform: [{scale: secondScale}]
                }}>
                    <Ionicons name={icons[index + 1]} color="#192a56" size={98} />
                </Card>
                <Card
                    {...panResponder.panHandlers}
                    style={{
                    transform: [{scale}, {translateX: position}, {rotateZ: rotation}]
                    }}
                >
                    <Ionicons name={icons[index]} color="#192a56" size={98} />
                </Card>
            </CardContainer>
            <BtnContainer>
                <Btn onPress={() => closePress()}>
                    <Ionicons name="close-circle" color='white' size={58} />
                </Btn>
                <Btn onPress={() => checkPress()}>
                    <Ionicons name="checkmark-circle" color='white' size={58} />
                </Btn>
            </BtnContainer>
        </Container>
    )
}


