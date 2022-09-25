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
  position: absolute;
  // 카드의 위치를 고정값으로 적용 
`
// 고정값으로 해놨기에 위치 틀어져서 해당 카드들이 모인 박스를 정의
const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`
// 버튼 디자인
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
        // 위에 설정한 값을 넘어 갈 때 행동할것을 정해줌
        extrapolate: 'clamp'
    })
    // 두번쨰 카드의 위치 값 지정
    // 첫 번째 카드 뒤에 작게 위치 하고 있음
    const secondScale = position.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: [1, .7, 1],
        extrapolate: 'clamp'
    })

    // 움직이는 애니메이션 정의
    const goCenter = Animated.spring(position, {toValue : 0, useNativeDriver: true})
    const goLeft = Animated.spring(position, {toValue: -400, tension: 5, useNativeDriver: true})
    const goRight = Animated.spring(position, {toValue: 400, tension: 5, useNativeDriver:  true})

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => onPressIn(),
        onPanResponderRelease: (_, {dx}) => {
            if( dx < -250){
                goLeft.start()
            } else if (dx > 250) {
                goRight.start()
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
        goLeft.start();
    }
    const checkPress = () => {
        goRight.start()
    }

    return (
        <Container>
            <CardContainer>
                <Card style={{
                    transform: [{scale: secondScale}]
                }}>
                    <Ionicons name="beer" color="#192a56" size={98} />
                </Card>
                <Card
                    {...panResponder.panHandlers}
                    style={{
                    transform: [{scale}, {translateX: position}, {rotateZ: rotation}]
                    }}
                >
                    <Ionicons name="pizza" color="#192a56" size={98} />
                </Card>
            </CardContainer>
            {/* 해당 아이콘을 아는지 모르는지에 대한 버튼 여부 안다 모른다 느낌의 아이콘 */}
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


