import React, {useRef, useState} from 'react';
import styled from "styled-components/native";
import {
    Animated,
    PanResponder,
    View
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
// Ionicons 의 아이콘을 정리하여 모아둠
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
    const goLeft = Animated.spring(position, {toValue: -400, tension: 5, useNativeDriver: true})
    const goRight = Animated.spring(position, {toValue: 400, tension: 5, useNativeDriver:  true})

    // 카드 배열의 위치를 기억 하기 위해 설정
    const [index, setIndex] = useState(0);
    // 움직임이 완료 됐을때 실행
    const onDismiss = () => {
        scale.setValue(1);
        // 첫 장의 카드를 다시 원 위치로 돌아오게 함
        position.setValue(0)
        // 아이콘의 배열을 위해 값을 계속 추가 해서 아이콘이 계속 바뀜
        setIndex(prev => prev + 1)
    }
    // 그래서 시야에선 무한히 카드가 생성 되는 것 처럼 보임

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


