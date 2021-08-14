import React, { useState, useRef, useMemo } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Svg, { Line } from "react-native-svg";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const { width } = Dimensions.get("window");

const WIDTH = width - 80;
const { View: AView, Value, event, set } = Animated;

const usePanGesture = () => {
  const transX = useRef(new Value(0)).current;
  const offsetX = useRef(new Value(0)).current;

  console.log(transX)

  const onGestureHandler = useMemo(() => {
      return event([
          {
              nativeEvent:({translationX:x, state }) => set(transX, x)
          }
      ])
  }, [transX, offsetX]);
  return {
    transX,
    onGestureHandler,
  };
};

const PanComponent = () => {
  const { onGestureHandler, transX } = usePanGesture();
  return (
    <PanGestureHandler
      onGestureEvent={onGestureHandler}
      onHandlerStateChange={onGestureHandler}
    >
      <AView style={[style.knob, { transform: [{ translateX: transX }] }]} />
    </PanGestureHandler>
  );
};

const InputRange = ({ minValue, maxvalue, onChangeMin, onChangeMax }) => {
  const [widthLine, setWidthLine] = useState(0);
  return (
    <View style={style.container}>
      <View style={style.trilho} />
      <View style={{ position: "absolute" }}>
        <Svg height="6" width={WIDTH}>
          <Line
            stroke="#43D29E"
            strokeWidth="12"
            x1={100}
            x2={500}
            y1={0}
            y2={0}
          />
        </Svg>
      </View>
      <PanComponent />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    justifyContent: "center",
  },
  trilho: {
    backgroundColor: "#B9BED1",
    position: "absolute",
    height: 6,
    borderRadius: 6,
    width: width - 80,
  },
  knob: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "absolute",
    elevation: 5,
  },
});

export default InputRange;
